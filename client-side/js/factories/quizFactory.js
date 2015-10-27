angular.module("AAW")
.factory("QuizFactory", QuizFactory);

function QuizFactory($q, $http){
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

  return this;
}