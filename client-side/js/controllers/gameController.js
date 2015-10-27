angular.module("AAW").controller("GameController", GameController);

function GameController(GameFactory, Pusher){
  var vm = this;

  vm.currentPlayer = {
    name: null,
    score: 0
  };
  vm.games = [];

  Pusher.subscribe('games', 'created', function (newGame) {
    vm.games.push(newGame);
  });

  vm.getGames = function(){
    GameFactory.getGames().then(function(response){
      vm.games = response;
    })
  }

  vm.createGame = function(){
    GameFactory.createGame(vm.currentPlayer).then(function(response){
      console.log(response);
      // vm.games.push(response); 
    })
  }

  vm.joinGame = function(game){
    game.players.push(vm.newPlayer)
  }

  vm.startGame = function(game){
    vm.getQuizzes(game);

  }

  vm.getQuizzes = function(game){
    QuizFactory.getQuizzes()
    .then(function(response){
      console.log(response);
      game.quizzes = response;
      // vm.score = 0;
      game.currentQuestion = game.quizzes[game.currentCount]
      // console.log("currentQuestion is: ")
      // console.log(vm.currentQuestion)
      return response;
    })
  }

  vm.getGames();

}