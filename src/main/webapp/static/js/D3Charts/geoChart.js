function geoChart(obj) {

    var width = 900,
        height = 530;

    var projection = d3.geo.mercator()
        .center([0, 5])
        .scale(200)
        .rotate([-180, 0]);

    var svg = d3.select("#chart1").append("svg")
        .attr("width", width)
        .attr("height", height);

    var path = d3.geo.path()
        .projection(projection);

    var g = svg.append("g");

// load and display the World
    d3.json("static/dummyData/world-110m2.json", function (error, topology) {

// load and display the cities
        d3.json("/b1/report/6/2016-04-08,2016-05-02/all", function (error, data) {
            debugger
            g.selectAll("circle")
                .data(data)
                .enter()
                .append("a")
                .attr("xlink:href", function (d) {
                        return "https://www.google.com/search?q=" + d.city;
                    }
                )
                .append("circle")
                /*.attr("cx", function (d) {
                    //debugger;
                    var cityDetails = d.city.split(",");
                    return projection([cityDetails[1], cityDetails[2]])[0];
                })
                .attr("cy", function (d) {
                    var cityDetails = d.city.split(",");
                    return projection([cityDetails[1], cityDetails[2]])[0];
                })*/
                .attr("r", 2)
                .attr("transform", function(d) {
                    var cityDetails = d.city.split(",");
                    return "translate(" + projection([
                            cityDetails[2],
                            cityDetails[1]
                        ]) + ")";
                })
                .style("fill", "red");
        });


        g.selectAll("path")
            .data(topojson.object(topology, topology.objects.countries)
                .geometries)
            .enter()
            .append("path")
            .attr("d", path)
    });

// zoom and pan
    var zoom = d3.behavior.zoom()
        .on("zoom", function () {
            g.attr("transform", "translate(" +
                d3.event.translate.join(",") + ")scale(" + d3.event.scale + ")");
            g.selectAll("circle")
                .attr("d", path.projection(projection));
            g.selectAll("path")
                .attr("d", path.projection(projection));

        });

    svg.call(zoom)
}