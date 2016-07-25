function geoChart(obj) {

    var
        topology= obj.topoJsonData,
        targetID = obj.targetID,
        dimension = obj.dimension,
        data = obj.data,
        chartPlaceHolder = d3.select("#"+obj.targetID),
        margin = {top: 0, right: 0, bottom: 0, left: 0},
        axis = obj.axis,
        axisXkey=axis.axisXkey,
        axisYkey=axis.axisYkey,
        strokecolor="#000"
        ;

    if(!!obj.margin){
        margin = obj.margin;
    }

    var
        width = parseInt(chartPlaceHolder[0][0].offsetWidth * parseInt(dimension.width)/100) - margin.left - margin.right,
        height = width * parseInt(dimension.height)/100 - margin.top - margin.bottom,
        tooltip = chartPlaceHolder
            .append("div")
            .attr({'class':'chartTooltip'})
        ;

    var projection = d3.geo.mercator()
        .center([0, 5])
        .scale(250)
        .rotate([-100, 0]);

/*    var projection = d3.geo.mercator()
        .translate([0, 0])
        .scale(width / 2 / Math.PI);*/

    var svg = d3.select("#"+targetID).append("svg")
        .attr("width", width)
        .attr("height", height);

    var path = d3.geo.path()
        .projection(projection);

    var g = svg.append("g");
    var hoverTimeout;
// load and display the World
/*    d3.json("static/dummyData/world-110m2.json", function (error, topology) {*/

// load and display the cities
/*        d3.json("/b1/report/6/2016-04-08,2016-05-02/all", function (error, data) {*/

    g.selectAll("path")
        .data(topojson.object(topology, topology.objects.countries).geometries)
        .enter()
        .append("path")
        .attr("d", path)
        .on("mouseover",function(d,i){

            if(!!hoverTimeout){
                clearTimeout(hoverTimeout);
            }

            g.selectAll("path")
                .transition()
                .duration(250)
                .attr({
                    "opacity": function(d, j) {
                        return j != i ? 0.4 : 1;
                    },
                    "stroke": strokecolor,
                    "stroke-width": function(d, j) {
                        return j === i ? 0.5 : 0;
                    }
                });
        })
        .on("mouseout",function(d,i) {
             hoverTimeout = setTimeout(function(){
                g.selectAll("path")
                    .transition()
                    .duration(250)
                    .attr({"opacity": "1", "stroke-width": 0})
                ;
            },500);

        });

try {
    g.selectAll("circle")
        .data(data)
        .enter()
        .append("a")
        .attr("xlink:href", function (d) {
                return "https://www.google.com/search?q=" + d.city;
            }
        )
        .append("circle")
        .attr("r", 3)
        .attr("transform", function (d) {
            var cityDetails = d.city.split(",");
            var projectionValues = projection([
                cityDetails[2],
                cityDetails[1]
            ]);



                if(isNaN(projectionValues[0]) || isNaN(projectionValues[1])) {
                    console.log(projectionValues);
                    console.log(cityDetails);
                }

                return "translate(" + projectionValues + ")";

        })
        .style("fill", "red")
        .on("mousemove", function (d) {
            //debugger;
            pathData = d;

            mouse = d3.mouse(d3.select("#"+targetID)[0][0]);
            mousex = mouse[0] + 15 + margin.left;
            mousey = mouse[1] + 15 + margin.top;
            // console.log(mouse);

            //console.log(d3.event.pageX+", "+d3.event.pageY);

            tooltip.style({display: 'block', left: mousex + "px", top: mousey + "px"});

            tooltip.html(function () {
                return axis.xLabel + " :" + pathData[axisXkey] + "</br>" +
                    axis.yLabel + " :" + pathData[axisYkey] + "</br>"
                ;
            })

            if(!!hoverTimeout){
                clearTimeout(hoverTimeout);
            }
        })
        .on("mouseout", function () {
            tooltip.style({display: 'none'});
        });
    /*
     //debugger;
     var cityDetails = d.city.split(",");
     return projection([cityDetails[2], cityDetails[2]])[1];
     })
     .attr("cy", function (d) {
     var cityDetails = d.city.split(",");
     return projection([cityDetails[2], cityDetails[2]])[1];
     })
     */
} catch (e) {
    //console.log(e);
}

/*        });*/


   /* });*/



// zoom and pan
    var zoom = d3.behavior.zoom()
        .scaleExtent([1, 8])
        .on("zoom", function () {


            var t = d3.event.translate,
                s = d3.event.scale;
            t[0] = Math.min(width / 2 * (s - 1), Math.max(width / 2 * (1 - s), t[0]));
            t[1] = Math.min(height / 2 * (s - 1) + 230 * s, Math.max(height / 2 * (1 - s) - 230 * s, t[1]));
            zoom.translate(t);
            g.style("stroke-width", 1 / s).attr("transform", "translate(" + t + ")scale(" + s + ")");

            g.attr("transform", "translate(" +
                d3.event.translate.join(",") + ")scale(" + d3.event.scale + ")");

            g.selectAll("circle")
                .attr("d", path.projection(projection))
                .attr("r", function(){
                    var self = d3.select(this);
                    var r = 3 / d3.event.scale;
                    self.style("stroke-width", r < 4 ? (r < 2 ? 0.5 : 1) : 2);
                    return r;
                })
            ;

            g.selectAll("path")
                .attr("d", path.projection(projection));

        });

    svg.call(zoom);

}

