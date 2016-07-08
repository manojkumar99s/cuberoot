d3.json("static/dummyData/performance-new.json",function(error,data){

    data.forEach(function (d) {
        var
            now = new Date(d.date),
            yearStartDay = new Date(now.getFullYear(), 0, 0),
            diff = now - yearStartDay,
            day = Math.floor(diff / this.oneDay)
            ;
        d.day = day;
        d.date = new Date(d.date);
        d.impression = +d.impression;
        //debugger;
    });

var margin = {top: 40, right: 40, bottom: 40, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scaleLinear()
    .range([0, width]);

var y = d3.scaleLinear()
    .range([height, 0]);

var line = d3.line()
    .defined(function(d) { return d; })
    .x(function(d) { return x(d.date);})
    .y(function(d) { return y(d.impression = +d.impression); })
;

var area = d3.area()
    .defined(line.defined())
    .x(line.x())
    .y1(line.y())
    .y0(y(0));

var svg = d3.select("#areaChartMissing").append("svg")
    .datum(data)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("path")
    .attr("class", "area")
    .attr("d", area);

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

svg.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(y));

svg.append("path")
    .attr("class", "line")
    .attr("d", line);

svg.selectAll(".dot")
    .data(data.filter(function(d) { return d; }))
    .enter().append("circle")
    .attr("class", "dot")
    .attr("cx", line.x())
    .attr("cy", line.y())
    .attr("r", 3.5);

});