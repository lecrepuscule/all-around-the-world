var mongoose = require("mongoose");

var quizSchema = new mongoose.Schema({
  question: String,
  info: String,
  answer: String
});

module.exports = mongoose.model("Quiz", quizSchema);