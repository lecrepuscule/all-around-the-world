var gulp = require("gulp");
var request = require("request");
var cheerio = require("cheerio");
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/AAW');
var Country = require("./models/country.js")
var Quiz = require("./models/quiz.js");
var AWS = require('aws-sdk');

gulp.task("scrape", function(){
  var indexUrl = "http://jservice.io/popular";
  var urls = [];
  request(indexUrl, function(err, res, body){
    if(!err){
      var index = cheerio.load(body);
      index("tbody").filter(function(){
        var results = index(this);

        for (j=1; j<results["0"].children.length; j+=2) {
          var url = "http://jservice.io" + results["0"].children[j].children[1].children[0].attribs.href
          // console.log(url)
          urls.push(url);
        }

        urls.forEach(function(url){
          request(url, function(error, response, html){
            console.log("request for url: " + url)
            if(!error){
              var $ = cheerio.load(html);
              $('tbody').filter(function(){
                var data = $(this)
                Country.distinct("name", function(err, countries){
                  if (err) console.log(err);
                  var quizzes = [];
                  for (i=1; i<data["0"].children.length; i+=2){
                    var q = {};
                    q.question = data["0"].children[i].children[1].children[0].data
                    q.answer = data["0"].children[i].children[3].children[0].data
                    // console.log(quiz);
                    quizzes.push(q);
                  }
                  quizzes.forEach(function(quiz){
                    // console.log(quiz);
                    if (countries.indexOf(quiz.answer) !== -1) {
                      Quiz.find({question: quiz.question}, function(err, existingQuiz){
                
                        // console.log(existingQuiz.length);
                        if(existingQuiz.length === 0){
                          // console.log("the question is: " + quiz.question);
                          newQuiz = {
                            question: quiz.question,
                            answer: quiz.answer
                          };

                          Quiz.create(newQuiz, function(err, createdQuiz){
                          if (err) console.log(err);
                            console.log("successfully created quiz: ")  
                            console.log(createdQuiz);
                          });
                        }
                      })
                    }    
                  })
                })
              })
            }
          })
        })
      })
    }
  })
})

function scrapeJService(j, results){
  if (j<results["0"].children.length) {
    var url = "http://jservice.io" + results["0"].children[j].children[1].children[0].attribs.href
    // console.log(url)
    request(url, function(error, response, html){
      console.log("request for url: " + url)
      if(!error){
        var $ = cheerio.load(html);
        $('tbody').filter(function(){
          var data = $(this)
          Country.distinct("name", function(err, countries){
            if (err) console.log(err)
            for (i=1; i<data["0"].children.length; i+=2){
              var question = data["0"].children[i].children[1].children[0].data
              var answer = data["0"].children[i].children[3].children[0].data 
              if (countries.indexOf(answer) !== -1) {
                console.log("the question is: " + question);
                Quiz.find({question: question}, function(err, existingQuiz){
                  if(!existingQuiz){
                    newQuiz = {
                      question: question,
                      answer: answer
                    };

                    Quiz.create(newQuiz, function(err, createdQuiz){
                    if (err) console.log(err);
                      console.log("successfully created quiz: " + createdQuiz);
                      j += 2;
                      scrapeJService(j, results)
                    });
                  }
                })
              }    
            }
          })
        })
      }
    })
  } else {
    console.log("complete");
  }
}

gulp.task("populateQuizCountryCode", function(){
  var populatedQuizzes = [];
  Quiz.find({}, function(err, quizzes){
    if (err) console.log(err);
    quizzes.forEach(function(quiz){
      Country.find({name: quiz.answer}, function(err, country){
        quiz.answer2Code = country["0"].alpha2Code;
        quiz.answer3Code = country["0"].alpha3Code;

        populatedQuizzes.push(quiz);
        if (populatedQuizzes.length === quizzes.length){
          populatedQuizzes.forEach(function(populatedQuiz){
            populatedQuiz.save(function(err, savedQuiz){
              if (err) console.log(err)
                console.log(savedQuiz);
            })
          })
        }
      })
    })
  })
})

gulp.task("populateFlagUrls", function(){
  var availableFlags = ["ad","ae","af","ag","al","am","ao","ar","at","au","az","ba","bb","bd","be","bf","bg","bh","bi","bj","bn","bo","br","bs","bt","bw","by","bz","ca","cd","cf","cg","ch","ci","cl","cm","cn","co","cr","cu","cv","cy","cz","de","dj","dk","dm","do","dz","ec","ee","eg","eh","er","es","et","fi","fj","fm","fr","ga","gb","gd","ge","gh","gm","gn","gq","gr","gt","gw","gy","hn","hr","ht","hu","id","ie","il","in","iq","ir","is","it","jm","jo","jp","ke","kg","kh","ki","km","kn","kp","kr","ks","kw","kz","la","lb","lc","li","lk","lr","ls","lt","lu","lv","ly","ma","mc","md","me","mg","mh","mk","ml","mm","mn","mr","mt","mu","mv","mw","mx","my","mz","na","ne","ng","ni","nl","no","np","nr","nz","om","pa","pe","pg","ph","pk","pl","pt","pw","py","qa","ro","rs","ru","rw","sa","sb","sc","sd","se","sg","si","sk","sl","sm","sn","so","sr","st","sv","sy","sz","td","tg","th","tj","tl","tm","tn","to","tr","tt","tv","tw","tz","ua","ug","us","uy","uz","va","vc","ve","vn","vu","ws","ye","za","zm","zw"];
  var populatedCountries=[];
  
  Country.find({}, function(err, countries){
    countries.forEach(function(country){

      if (availableFlags.indexOf(country.alpha2Code.toLowerCase()) !== -1){
        var flagUrl = "https://s3-eu-west-1.amazonaws.com/allaroundtheworld/" + country.alpha2Code.toLowerCase() + ".png"
        console.log(country.alpha2Code);
        console.log(typeof country);
        country.flag = flagUrl;
        populatedCountries.push(country);
        country.save(function(err, savedCountry){
          if (err) console.log(err)
            console.log(savedCountry);
        })
      }
    })
  })
})

gulp.task("makeFlagQuizzes", function(){
  Country.find({}, function(err, countries){
    countries.forEach(function(country){
      if (country.flag) {
        var flagQuiz = {
          question: "This is the flag of which country?",
          info: country.flag,
          answer: country.name,
          answer2Code: country.alpha2Code,
          answer3Code: country.alpha3Code
        }
        Quiz.create(flagQuiz, function(err, createdQuiz){
          if (err) console.log(err);
          console.log("created quiz: ");
          console.log(createdQuiz);
        })
      }
    }
  })
}

// gulp.task("default", ["scripts", "styles"]);
