var mongoose = require("mongoose");
var request = require("request");

var quizSchema = new mongoose.Schema({
  question: String,
  info: String,
  answer: String
});

module.exports = mongoose.model("Country", countrySchema);