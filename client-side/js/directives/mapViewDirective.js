angular.module("AAW")
  .directive("map", ["d3Service", "mapService", function(d3Service, mapService){
  var directive = {};
  directive.restrict = "EA";
  directive.scope = false;
  directive.template = "<h1>{{ qc.currentQuestion.question }}</h1>" + "<h1>{{ qc.currentQuestion.currentCount }}</h1>";
  directive.link = function(scope, element, attrs) {
    d3Service.d3().then(function(d3) {
      mapService.datamaps().then(function(datamaps){
        console.log(element[0])
        var map = new Datamap({
          element: element[0],
          // height: 400,
          // width: 1000,
          projection: 'mercator',
          fills: {
            // defaultFill: "#ABDDA4",
            defaultFill: "blue"
          },
          responsive: true,
          geographyConfig: {
            highlightOnHover: true,
            popupOnHover: true,
            highlightFillColor: 'green'
          },
          done: function(datamap) {
            datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
              scope.$apply(function(){
                console.log(scope.qc)
                console.log(scope.qc.currentQuestion.answer)
                console.log(scope.qc.currentCount)
                console.log(geography);
                if (geography.properties.name === scope.qc.currentQuestion.answer) {
                  console.log("right answer!")
                  scope.qc.currentCount++
                  scope.qc.currentQuestion = scope.qc.all[scope.qc.currentCount]
                }
              })
                // alert(geography.properties.name);
            });
          },
          // arcConfig: {
          //   strokeColor: '#DD1C77',
          //   strokeWidth: 10,
          //   arcSharpness: 10,
          //   animationSpeed: 600
          // }
        });

        d3.select(window).on('resize', function() {
          map.resize();
        });    
      })
    })
  }
  return directive;
}]);