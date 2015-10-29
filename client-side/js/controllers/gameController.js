angular.module("AAW").controller("GameController", GameController);

function GameController(GameFactory, Pusher, $state, $interval){
  var vm = this;
  vm.games = [];
  vm.endTurn = false;

  vm.currentPlayer = {
    name: null,
    score: 0,
    answer: null
  };
  vm.currentGame;
  vm.currentQuestion;

  Pusher.subscribe('games', 'created', function (newGame) {
    console.log("creating game triggered pusher")
    vm.games.push(newGame);
  });

  //need to change the channel to be dynamic
  Pusher.subscribe('games', 'joined', function (joinedGame) {
    console.log("joining game triggered pusher")
    vm.currentGame = joinedGame;
  });

  Pusher.subscribe('games', 'started', function (startedGame) {
    console.log("from pusher started game");
    console.log(startedGame);
    vm.currentGame = startedGame;
    vm.currentQuestion = startedGame.quiz;
  });

  Pusher.subscribe('games', 'updated', function (updatedGame) {
    console.log("from pusher updated game");
    console.log(updatedGame);
    vm.currentPlayer.answer = null;
    vm.currentGame = updatedGame;
    vm.currentQuestion = updatedGame.quiz;
    vm.endTurn = false;
    $state.go("game", {}, {reload: true});
  });

  vm.getGames = function(){
    GameFactory.getGames().then(function(response){
      vm.games = response;
    })
  }

  vm.createGame = function(){
    GameFactory.createGame(vm.currentPlayer).then(function(response){
      console.log(response);
      vm.currentGame = response;
      $state.go("staging"); 
    })
  }

  vm.joinGame = function(game){
    GameFactory.joinGame(game, vm.currentPlayer).then(function(response){
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
    GameFactory.startGame(game).then(function(response){
      $state.go("game");
    })
  }

  vm.recordScore = function(){
    GameFactory.recordScore(vm.currentPlayer, vm.currentGame).then(function(response){
      console.log(response);
    })
  }

  vm.nextTurn = function(){
    var correctAnswer = document.getElementsByClassName(vm.currentQuestion.answer3Code)[0];
    if (correctAnswer) {
      correctAnswer.classList.add("correct");
    }
    vm.endTurn = true;

    var safeword = setTimeout(function(){
      GameFactory.nextTurn(vm.currentGame).then(function(response){
        console.log(response);
      })
    }, 3000)
  }

  vm.getGames();

}