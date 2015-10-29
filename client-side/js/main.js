angular.module("AAW", ["ui.router", "d3", "datamaps", "doowb.angular-pusher", "timer"])
.config(['PusherServiceProvider',
  function(PusherServiceProvider) {
    PusherServiceProvider
    .setToken('67fee088609cc79322b9')
    .setOptions({});
  }
])
.config(MainRouter);


function MainRouter($stateProvider, $urlRouterProvider){
  console.log("router linked up")
  $urlRouterProvider.otherwise("/");
  // $locationProvider.html5Mode(true);

  $stateProvider
    .state("home", {
      url: "/",
      templateUrl: "home.html"
    })
    .state("staging", {
      url: "/staging",
      templateUrl: "staging.html"
    })
    .state("game", {
      url: "/game",
      templateUrl: "game.html"
    })
    .state("login", {
      url: "/login",
      templateUrl: "login.html"
    })
}


