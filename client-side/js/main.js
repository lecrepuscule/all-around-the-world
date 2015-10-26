// angular.module("AAW", []);

var map = new Datamap({element: document.getElementById('container')});

// var width = 960;
// var height = 1160;

// var svg = d3.select("body").append("svg")
//     .attr("width", width)
//     .attr("height", height);

// d3.json("js/world.json", function(err, world){
//   if(err) console.log(err);
//   console.log(world);

//   var subunits = topojson.feature(world, world.objects.subunits);
//   console.log(subunits);

//   var projection = d3.geo.albers()
//     .center([24.5, -13])
//     .rotate([4.4, 0])
//     .parallels([50, 60])
//     .scale(200)
//     .translate([width/2, height/2]);

//   var path = d3.geo.path()
//     .projection(projection);

//   svg.selectAll(".subunits")
//     .data(topojson.feature(world, world.objects.subunits).features)
//     .enter()
//     .append("path")
//     .attr("class", function(d){ return "subunit" + d.id; })
//     .attr("d", path)

//   svg.append("path")
//     .datum(topojson.mesh(world, world.objects.subunits, function(a, b){ return a!==b; }))
//     .attr("d", path)
//     .attr("class", "subunit-boundary");

  // svg.append("path")
  //   .datum(topojson.mesh(uk, uk.objects.subunits, function(a, b){return a===b && a.id === "IRL"; }))
  //   .attr("d", path)
  //   .attr("class", "subunit-boundary IRL");



// });