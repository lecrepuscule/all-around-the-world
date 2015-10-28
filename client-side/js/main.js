angular.module("AAW", ["ui.router", "d3", "datamaps", "doowb.angular-pusher"])
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
    .state("archive", {
      url: "/archive",
      templateUrl: "archive.html"
    })
    .state("login", {
      url: "/login",
      templateUrl: "login.html"
    })
}


