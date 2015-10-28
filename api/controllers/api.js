var Country = require("../models/country.js");
var Quiz = require("../models/quiz.js");
var Game = require("../models/game.js");

var Pusher = require('pusher');
var pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET
});


function quizSet(req, res){
  Quiz.find({}, function(err, quizzes){
    if (err) console.log(err);
    console.log(quizzes);
    // res.json(quizzes);
  })
}

function getGames(req, res){
  Game.find({}, function(err, games){
    if (err) console.log(err);
    console.log(games);
    res.json(games);
  })
}

function createGame(req, res){
  var newGame = new Game(req.body)
  newGame.save(function(err, createdGame){
    if (err) console.log(err);
    console.log(createdGame);
    pusher.trigger('games', 'created', createdGame);
    res.json(createdGame);
  })
}

function joinGame(req, res){
  console.log(req.params.id);
  var newPlayer = req.body
  console.log(newPlayer);
  Game.findById(req.params.id, function(err, game){
    if (err) console.log(err);
    game.players.push(newPlayer);
    game.save(function(err, joinedGame){
      if (err) console.log(err);
      pusher.trigger('games', 'joined', joinedGame);
      res.json(joinedGame);
    })
  })
}

function deleteGame(req, res){
  Game.findByIdAndRemove(req.params.id, function(err, deletedGame){
    if (err) console.log(err);
    res.json(deletedGame);
  })
}

function startGame(req, res){

}
  

module.exports = {
  quizSet: quizSet,
  getGames: getGames,
  createGame: createGame,
  joinGame: joinGame,
  startGame: startGame,
  deleteGame: deleteGame
}