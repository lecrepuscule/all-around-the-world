var gulp = require("gulp");
var request = require("request");
var cheerio = require("cheerio");
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/AAW');
var Country = require("./models/country.js")
var Quiz = require("./models/quiz.js")

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


      // url = 'http://jservice.io/popular/1079';
      // url = 'http://jservice.io/popular/42';
      // request(url, function(error, response, html){
      //   if(!error){
      //     var $ = cheerio.load(html);
      //     $('tbody').filter(function(){
      //       var data = $(this)
      //       Country.distinct("name", function(err, countries){
      //         if (err) console.log(err)
      //         console.log(countries)

      //         for (i=1; i<data["0"].children.length; i+=2){
      //           var question = data["0"].children[i].children[1].children[0].data
      //           var answer = data["0"].children[i].children[3].children[0].data 

      //           // console.log("question index: " + countries.indexOf(question))
      //           // console.log("question index: " + countries.indexOf(answer))
      //           if ((countries.indexOf(question) !== -1) || (countries.indexOf(answer) !== -1)) {
      //             console.log(question)
      //             console.log(answer)
      //           }    
      //         }
      //       })
      //     })
      //   }
      // })
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

// gulp.task("default", ["scripts", "styles"]);
