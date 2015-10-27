angular.module("AAW")
  .directive("map", ["d3Service", "mapService", function(d3Service, mapService){
  var directive = {};
  directive.restrict = "EA";
  directive.scope = false;

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
              var self = this;
              scope.$apply(function(){
                console.log(self)
                console.log(geography);
                if (geography.properties.name === scope.qc.currentQuestion.answer) {
                  console.log("right answer!")
                  // self.classList.add("correct");
                  scope.qc.score++;
                }
                scope.qc.currentCount++;
                scope.qc.currentQuestion = scope.qc.all[scope.qc.currentCount];
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