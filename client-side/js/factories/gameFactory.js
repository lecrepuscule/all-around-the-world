angular.module("AAW")
.factory("GameFactory", GameFactory);

function GameFactory($q, $http){
  console.log("got this far");

  // this.getQuizzes = function(){
  //   $http
  //   .get("http://localhost:3000/api/quizzes")
  //   .success(function(response){
  //     deferred.resolve(response);
  //   })
  //   .error(function(error){
  //     deferred.reject(error);
  //   })
  //   return deferred.promise;
  // }

  this.joinGame = function(game, player){
    var deferred = $q.defer();
    var newPlayer = {
      name: player.name,
      score: 0
    }
    $http
      .put("http://localhost:3000/api/games/" + game._id , newPlayer)
      .success(function(response){
        console.log("response to the Factory is ")
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
    var deferred = $q.defer();
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

  this.deleteGame = function(id){
    var deferred = $q.defer();
    $http
    .delete("http://localhost:3000/api/games/" + id)
    .success(function(response){
        console.log(response);
        deferred.resolve(response);
      })
      .error(function(error){
        deferred.reject(error);
      })
      return deferred.promise;
  }

  return this;
}