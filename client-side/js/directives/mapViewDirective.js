angular.module("AAW")
  .directive("map", ["d3Service", "mapService", function(d3Service, mapService){
  var directive = {};
  directive.restrict = "EA";
  // directive.templateUrl = "_mapView.html";
  directive.link = function(scope, element, attrs) {
    d3Service.d3().then(function(d3) {
      mapService.datamaps().then(function(datamaps){
        var map = new Datamap({
          element: element[0],
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
                console.log(geography);
                // alert(geography.properties.name);
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