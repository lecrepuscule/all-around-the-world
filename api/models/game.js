var mongoose = require("mongoose");
var Quiz = require("./quiz.js");

var gameSchema = new mongoose.Schema({
  host: String,
  players: [{
    name: String,
    score: Number
  }],
  quizzes: [{
    quiz: {type: mongoose.Schema.ObjectId, ref: "Quiz"},
    used: Boolean
  }],
  open: Boolean
});

gameSchema.methods.initiate = function(callback){
  var vm = this;
  Quiz.find({}, function(err, quizzes){
    if (err) console.log(err);
    // console.log(quizzes);
    vm.quizzes = quizzes.map(function(quiz){
      return {quiz: quiz, used: false}
    });
    vm.open = false;
    vm.save(function(err, updatedGame){
      if (err) console.log(err);
      callback(updatedGame);
    })
  })
}

gameSchema.methods.nextQuiz = function(callback, usedQuiz){
  var vm = this;
  var unusedQuizzes = vm.quizzes.filter(function(quiz){
    
    if ( usedQuiz && usedQuiz._id === (quiz.quiz).toString()) {
      console.log("inside filter function");
      console.log(quiz);
      quiz.used = true;
    }
    return !quiz.used;
  })

  var sampleIndex = Math.floor(Math.random()*unusedQuizzes.length);

    Quiz.findById(unusedQuizzes[sampleIndex].quiz, function(err, nextQuiz){
        if (err) console.log(err);
        callback(nextQuiz);
    });
}

module.exports = mongoose.model("Game", gameSchema);