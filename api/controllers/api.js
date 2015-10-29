var Country = require("../models/country.js");
var Game = require("../models/game.js");

var Pusher = require('pusher');
var pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET
});

function getGames(req, res){
  Game.find({}, function(err, games){
    if (err) console.log(err);
    res.json(games);
  })
}

function createGame(req, res){
  var newGame = new Game(req.body)
  newGame.save(function(err, createdGame){
    if (err) console.log(err);
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
  Game.findById(req.params.id, function(err, game){
    if (err) console.log(err);
    game.initiate(function(initiatedGame){
      initiatedGame.nextQuiz(function(nextQuiz){
        var gameStatus = {
          _id: initiatedGame._id,
          players: initiatedGame.players,
          open: initiatedGame.open,
          quiz: nextQuiz
        }
        pusher.trigger('games', 'started', gameStatus);
        res.json(gameStatus);
      });
    })
  })
}

function recordScore(req, res){
  Game.findById(req.params.id, function(err, game){
    if (err) console.log(err);

    var player = req.body;
    for (i=0; i<game.players.length; i++){
      if (game.players[i].name === player.name && game.players[i].score !== player.score) {
        game.players[i].score = player.score;
        game.save(function(err, recordedGame){
          if (err) console.log(err);
          res.json(recordedGame);   
        })
      }
    }
  })
}
  
function nextTurn(req, res){
  Game.findById(req.params.id, function(err, game){
    if (err) console.log(err);
    console.log("used quiz is: ")
    console.log(req.body);
    var usedQuiz = req.body;
    game.nextQuiz(function(nextQuiz){
      var gameStatus = {
        _id: game._id,
        players: game.players,
        open: game.open,
        quiz: nextQuiz,
      }
      pusher.trigger('games', 'updated', gameStatus);
      res.json(gameStatus);
    }, usedQuiz);
  })
}

module.exports = {
  getGames: getGames,
  createGame: createGame,
  joinGame: joinGame,
  startGame: startGame,
  deleteGame: deleteGame,
  recordScore: recordScore,
  nextTurn: nextTurn
}