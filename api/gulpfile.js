var gulp = require("gulp");
var request = require("request");
var cheerio = require("cheerio");

gulp.task("scrape", function(){
  url = 'http://jservice.io/popular/1079';
  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);
      $('tbody').filter(function(){
        var data = $(this)

        console.log(data["0"].children[1].children[1].children[0].data)
        console.log(data["0"].children[1].children[3].children[0].data)     

        console.log(data["0"].children[5].children[1].children[0].data)
        console.log(data["0"].children[5].children[3].children[0].data)

      })
    }
  })
})

// gulp.task("default", ["scripts", "styles"]);
