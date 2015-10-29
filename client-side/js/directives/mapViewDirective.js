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
            defaultFill: "grey"
          },
          responsive: true,
          geographyConfig: {
            highlightOnHover: true,
            popupOnHover: true,
            highlightFillColor: 'blue'
          },
          done: function(datamap) {
            var worldmap = this;
            datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
              if (!scope.gc.currentPlayer.answer) {
                var clickedSubunit = this;

                scope.$apply(function(){
                  console.log(geography);
                  worldmap.geographyConfig.highlightOnHover = false;
                  worldmap.geographyConfig.popupOnHover = false;
                  clickedSubunit.classList.add("playerAnswer");
                  scope.gc.currentPlayer.answer = geography.properties.name;
                  console.log("added playerAnswer: " + scope.gc.currentPlayer.answer);
                })
              }
            });
          }
        });

        d3.select(window).on('resize', function() {
          map.resize();
        });    
      })
    })
  }
  return directive;
}]);