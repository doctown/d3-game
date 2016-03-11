// start slingin' some d3 here.
// CREATE CIRCLES
//var circle = d3.selectAll('circle');
//circle.style('fill', 'green');
//circle.data([32, 45, 76]);
//
//circle.attr('cx', function() {
//  return Math.random() * 720;
//}).attr('r', function (d) {
//  return Math.sqrt(d);
//});

// Initial data for circles
var data = [32, 57, 112, 293];

// ADD SVG CIRCLES BASED ON AMOUNT OF DATA
var svg = d3.select('svg');
/*
svg.selectAll('circle')
  .data([32, 57, 112, 293])
  .enter().append('circle')
  .attr('cy', 60)
  .attr('cx', function(d, i) { return i * 100 + 30; })
  .attr('r', function(d) { return Math.sqrt(d); });

*/


/*
svg.selectAll('circle')
  .data(data)
  .enter().append('circle')
  .attr('cy', 70).attr('cx', function(d) {
    return d + 3;
  }).attr('r', function(d) {
    return   Math.sqrt(d);
  });
*/

// Update function for updating the location of the circles
// Updates the location of the circles on the screen
var update = function (data) {
  // DATA JOIN
  // Join new data with old data
  var circle = svg.selectAll('circle')
    .data(data);

  // Update the circle's class css
  circle.attr('class', 'update');

  // ENTER
  circle.enter().append('circle')
    .attr('class', 'enter')
    .attr('cx', function(d) {
      return d * Math.random();
    })
    .attr('cy', 60)
    .attr('r', function(d) {
      return 10;
    });


  // UPDATE
  circle.transition()
    .attr('cx', function (d) {
      return Math.random()  * d;
    })
    .attr('cy', function (d) {
      return Math.random() * d;
    });
  // EXIT
  // Remove old elements as needed
  // circle.exit().remove();
};

// Call the initial update
update(data);



// MOVABLE CIRCLE
// Get the circle that is updated by the mouse
var mouse = d3.selectAll('svg');

movableCircle = mouse.selectAll('.mouse').data([1]);
movableCircle.enter()
  .append('circle')
  //.append('g')
  .attr('cx', function (d) { return d * 50; })
  .attr('cy', function (d) { return 50; })
  .attr('r', function (d) {
    return 10;
  }).style('fill', 'green');

svg.on('mousemove', function () {
  var coordinates = [0, 0];
  coordinates = d3.mouse(this);
  var x = coordinates[0];
  var y = coordinates[1];

  movableCircle.transition()
    .attr('cx', function (d) { return x; })
    .attr('cy', function (d) { return y; });

});


// Update the circles every 2 seconds
setInterval(function () {
  var newData = d3.shuffle(data);
  update(data);
}, 1000);