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

  Pusher.subscribe('games', 'joined', function (joinedGame) {
    vm.stagedGame = joinedGame;
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
      // vm.stagedGame = response;
      $state.go("staging");
    })
  }

  vm.abortGame = function(){

  }

  vm.deleteGame = function(id, index){
    GameFactory.deleteGame(id)
    .then(function(response){
      console.log(response);
      vm.games.splice(index,1);
    });
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