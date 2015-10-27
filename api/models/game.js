var mongoose = require("mongoose");

var gameSchema = new mongoose.Schema({
  host: String,
  players: [{
    name: String,
    score: Number
  }],
  quizzes: [{
    quiz: {type: mongoose.Schema.ObjectId, ref: "Quiz"},
    live: Boolean
  }],
  open: Boolean
});

module.exports = mongoose.model("Game", gameSchema);