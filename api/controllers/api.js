var Country = require("../models/country.js");
var Quiz = require("../models/quiz.js");


function quizSet(req, res){

  Quiz.find({}, function(err, quizzes){
    if (err) console.log(err);
    console.log(quizzes);
    res.json(quizzes);
  })
}
  

module.exports = {
  quizSet: quizSet
}