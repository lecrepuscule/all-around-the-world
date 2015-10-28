var mongoose = require("mongoose");
var Quiz = require("./quiz.js");

var gameSchema = new mongoose.Schema({
  host: String,
  players: [{
    name: String,
    score: Number
  }],
  unusedQuizzes: [{type: mongoose.Schema.ObjectId, ref: "Quiz"}],
  usedQuizzes: [{type: mongoose.Schema.ObjectId, ref: "Quiz"}],
  open: Boolean
});

gameSchema.methods.initiate = function(callback){
  var vm = this;
  Quiz.find({}, function(err, quizzes){
    if (err) console.log(err);
    // console.log(quizzes);
    vm.unusedQuizzes = quizzes;
    vm.open = false;
    vm.save(function(err, updatedGame){
      if (err) console.log(err);
      callback(updatedGame);
    })
  })
}

gameSchema.methods.nextQuiz = function(callback, usedQuiz){
  var vm = this;
  if (usedQuiz) {
    Quiz.findById(usedQuiz._id, function(err, quiz){
      var index = vm.unusedQuizzes.indexOf(quiz)
      console.log(index);
      this.unusedQuizzes.splice(index, 1);
      this.usedQuizzes.push(quiz);
    })
  }
  var sampleIndex = Math.floor(Math.random()* this.unusedQuizzes.length);
    Quiz.findById(vm.unusedQuizzes[sampleIndex], function(err, nextQuiz){
        if (err) console.log(err);
        callback(nextQuiz);
    });
}

module.exports = mongoose.model("Game", gameSchema);