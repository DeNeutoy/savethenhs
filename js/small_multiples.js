
var sm_margin = {top: 45, right: 50, bottom: 20, left: 20},
    sm_width = 450 - sm_margin.left - sm_margin.right,
    sm_height = 200 - sm_margin.top - sm_margin.bottom;

var color = d3.scale.linear()
    .range(['#deebf7','#9ecae1','#3182bd'])
    .domain([0, 5, 20]);

var sm_x = d3.scale.ordinal()
    .rangeRoundBands([0, sm_width], .1);

// Scales. Note the inverted domain fo y-scale: bigger is up!
var sm_y = d3.scale.linear()
    .range([sm_height, 0]);

var xAxis = d3.svg.axis()
    .scale(sm_x)
    .orient("bottom");

var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
        return "<strong>" + d.comissioning + "\t" + d.week + "</strong><br/><span style='color:#fff'>" + d.days*1 + "</span>";
    });

// csv loaded asynchronously
d3.tsv("./data/opel_levels.tsv", type, function(data) {

    // Data is nested by country
    var countries = d3.nest()
        .key(function(d) { return d.comissioning; })
        .entries(data);

    countries.forEach(function(s) {
      s.maxDays = d3.max(s.values, function(d) { return d.days; });
    });

    // Compute the minimum and maximum week and days across symbols.
    sm_x.domain(data.map(function(d) { return d.week; }));
    sm_y.domain([0, d3.max(countries, function(s) { return s.maxDays; })]);

    // Add an SVG element for each country, with the desired dimensions and margin.
    var multiple_svg = d3.select("#small-multiples").selectAll("svg")
        .data(countries)
        .enter()
        .append("svg:svg")
        .attr("width", sm_width + sm_margin.left + sm_margin.right)
        .attr("height", sm_height + sm_margin.top + sm_margin.bottom)
        .append("g")
        .attr("transform", "translate(" + sm_margin.left + "," + sm_margin.top + ")")
        .attr("position", "center");

    multiple_svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + sm_height + ")")
        .call(xAxis);

    multiple_svg.append("g")
    // Hide y axis
    // .attr("class", "y axis")
    // .call(yAxis)
        .append("text")
        .attr("x", function(d) { return sm_width/2 +3*d.key.length})
        .attr("y", 50)
        .attr("dy", ".71em")
        .attr("text-anchor", "end")
        .attr("font-size", "1.3em")
        .text(function(d) { return d.key})
        .attr("font-weight", "600");

    // Accessing nested data: https://groups.google.com/forum/#!topic/d3-js/kummm9mS4EA
    // data(function(d) {return d.values;})
    // this will dereference the values for nested data for each group
    multiple_svg.selectAll(".bar")
        .data(function(d) {return d.values;})
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return sm_x(d.week); })
        .attr("width", sm_x.rangeBand())
        .attr("y", function(d) { return sm_y(d.days); })
        .attr("height", function(d) { return sm_height - sm_y(d.days); })
        .attr("fill", function(d) {return color(d.days)})
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

    multiple_svg.call(tip);

});

function type(d) {
    d.days = +d.days;
    return d;
}
