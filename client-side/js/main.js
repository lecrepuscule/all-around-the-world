angular.module("AAW", ["d3", "datamaps", "doowb.angular-pusher"])
.config(['PusherServiceProvider',
  function(PusherServiceProvider) {
    PusherServiceProvider
    .setToken('67fee088609cc79322b9')
    .setOptions({});
  }
]);


