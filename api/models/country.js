var mongoose = require("mongoose");

var countrySchema = new mongoose.Schema({
  name: String,
  capital: String,
  region: String,
  subregion: String,
  demonym: String,
  location: {
    latitude: {type: Number}, 
    longitude: {type: Number}
  },
  borders: [String],
  alpha2Code: String,
  alpha3Code: String,
  currencies: [String],
  languages: [String],
  flag: String,
  woeid: Number
});

module.exports = mongoose.model("Country", countrySchema);