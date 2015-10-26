// angular.module("AAW", []);

var map = new Datamap({
  element: document.getElementById("map"),
  projection: 'mercator',
  fills: {
    defaultFill: "#ABDDA4",
    authorHasTraveledTo: "#fa0fa0"
  },
  responsive: true,
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

