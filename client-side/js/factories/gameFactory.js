angular.module("AAW")
.factory("GameFactory", GameFactory);

function GameFactory($q, $http){
  console.log("got this far");
  var deferred = $q.defer();

  this.getQuizzes = function(){
    $http
    .get("http://localhost:3000/api/quizzes")
    .success(function(response){
      deferred.resolve(response);
    })
    .error(function(error){
      deferred.reject(error);
    })
    return deferred.promise;
  }

  this.createGame = function(newPlayer){
    var newGame = {
      host: newPlayer.name,
      players: [newPlayer],
      quizzes: [],
      open: true
    };
    $http
      .post("http://localhost:3000/api/games",newGame)
      .success(function(response){
        deferred.resolve(response);
      })
      .error(function(error){
        deferred.reject(error);
      })
    return deferred.promise;
  }

  this.getGames = function(){
    $http
      .get("http://localhost:3000/api/games")
      .success(function(response){
        deferred.resolve(response);
      })
      .error(function(error){
        deferred.reject(error);
      })
    return deferred.promise;
  }

  return this;
}