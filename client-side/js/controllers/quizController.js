angular.module("AAW").controller("QuizController", QuizController);

function QuizController(QuizFactory){
  var vm = this;

  vm.all = [];
  vm.currentCount=0;
  vm.currentQuestion=vm.all[vm.currentCount];

  QuizFactory.getQuizzes()
  .then(function(response){
      console.log(response);
      vm.all = response;
      vm.currentCount = 0;
      vm.currentQuestion = vm.all[vm.currentCount]
      console.log("currentQuestion is: ")
      console.log(vm.currentQuestion)
  })

}