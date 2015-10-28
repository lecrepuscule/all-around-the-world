angular.module("AAW").controller("GameController", GameController);

function GameController(GameFactory, Pusher, $state){
  var vm = this;

  vm.currentPlayer = {
    name: null,
    score: 0
  };
  vm.games = [];
  vm.stagedGame;

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
      vm.stagedGame = response;
      $state.go("staging");
      // vm.games.push(response); 
    })
  }

  vm.joinGame = function(game){
    // game.players.push(vm.newPlayer)
    GameFactory.joinGame(game, vm.currentPlayer).then(function(response){
      console.log("joined into game: ")
      console.log(response)
      console.log("above is the response")
      vm.stagedGame = response;
      $state.go("staging");
    })
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