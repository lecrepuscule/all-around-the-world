var mongoose = require("mongoose");

var quizSchema = new mongoose.Schema({
  question: String,
  info: String,
  answer: String,
  answer2Code: String,
  answer3Code: String
});

module.exports = mongoose.model("Quiz", quizSchema);