var request = require("request");
var Country = require("./country.js");
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/AAW');

request('https://restcountries.eu/rest/v1/all', function (error, response, body){
  var countries = JSON.parse(body);
  console.log(countries.length);
  for(i=0; i<countries.length; i++){
    newCountry = {
      name: countries[i].name || null,
      capital: countries[i].capital || null,
      region: countries[i].region || null,
      subregion: countries[i].subregion || null,
      demonym: countries[i].demonym,
      currencies: countries[i].currencies || null,
      borders: countries[i].borders,
      alpha2Code: countries[i].alpha2Code,
      alpha3Code: countries[i].alpha3Code,
      location: {
        latitude: countries[i].latlng[0] || null,
        longitude: countries[i].latlng[1] || null
      },
      languages: countries[i].languages || null
    };

    Country.create(newCountry, function(err, createdCountry){
      if (err) console.log(err);
      getWoeId(createdCountry);
    });
  }
})

function getWoeId(country){
  request("http://where.yahooapis.com/v1/places.q('"+ country.name + "')?appid=" + process.env.YAHOO_CLIENT_ID + "&format=json", function(err, response, body){
    if(JSON.parse(body).places){
      Country.findByIdAndUpdate(country._id, {woeid: JSON.parse(body).places.place[0].woeid}, function(err, updatedCountry){
        if (err) console.log(err)
        console.log("updated woeid for country: ")
        console.log(updatedCountry)
      })
    }
  })
}