angular.module("AAW")
.factory("GameFactory", GameFactory);

function GameFactory($q, $http){
  console.log("got this far");

  this.startGame = function(game){
    var deferred = $q.defer();
    $http
      .get("http://3b368648.ngrok.io/api/games/" + game._id)
      .success(function(response){
        console.log(response)
        deferred.resolve(response);
      })
      .error(function(error){
        deferred.reject(error);
      })
    return deferred.promise;
  }

  this.joinGame = function(game, player){
    var deferred = $q.defer();
    var newPlayer = {
      name: player.name,
      score: 0
    }
    $http
      .put("http://3b368648.ngrok.io/api/games/" + game._id , newPlayer)
      .success(function(response){
        console.log(response)
        deferred.resolve(response);
      })
      .error(function(error){
        deferred.reject(error);
      })
    return deferred.promise;
  }

  this.createGame = function(newPlayer){
    var deferred = $q.defer();
    var newGame = {
      host: newPlayer.name,
      players: [newPlayer],
      quizzes: [],
      open: true
    };
    $http
      .post("http://3b368648.ngrok.io/api/games",newGame)
      .success(function(response){
        deferred.resolve(response);
      })
      .error(function(error){
        deferred.reject(error);
      })
    return deferred.promise;
  }

  this.getGames = function(){
    var deferred = $q.defer();
    $http
      .get("http://3b368648.ngrok.io/api/games")
      .success(function(response){
        deferred.resolve(response);
      })
      .error(function(error){
        deferred.reject(error);
      })
    return deferred.promise;
  }

  this.deleteGame = function(id){
    var deferred = $q.defer();
    $http
    .delete("http://3b368648.ngrok.io/api/games/" + id)
    .success(function(response){
        console.log(response);
        deferred.resolve(response);
      })
      .error(function(error){
        deferred.reject(error);
      })
      return deferred.promise;
  }

  this.nextTurn = function(gameStatus){
    console.log("nextTurn in factory");
    console.log(gameStatus);
    var deferred = $q.defer();
    $http
    .patch("http://3b368648.ngrok.io/api/games/" + gameStatus._id, gameStatus.quiz)
    .success(function(response){
        console.log(response);
        deferred.resolve(response);
      })
      .error(function(error){
        deferred.reject(error);
      })
      return deferred.promise;
  }

  this.recordScore = function(player, gameStatus){
    var deferred = $q.defer();
    if (player.answer === gameStatus.quiz.answer) {
      player.score++;
      console.log("player score has become: " + player.score)

      $http
      .post("http://3b368648.ngrok.io/api/games/" + gameStatus._id, player)
      .success(function(response){
          console.log(response);
          deferred.resolve(response);
        })
      .error(function(error){
        deferred.reject(error);
      })
    }
    return deferred.promise;
  }

  return this;
}