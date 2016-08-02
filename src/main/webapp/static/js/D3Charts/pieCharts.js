function pieChart(obj) {

    var
        dimension = obj.dimension,
        viewScope = obj.viewScope,
        commonService = obj.commonService,
        data = obj.data,
        chartPlaceHolder = d3.select("#"+obj.targetID),
        margin = {top: 20, right: 20, bottom: 20, left: 20},
        axis = obj.axis,
        axisXkey=axis.axisXkey,
        axisYkey=axis.axisYkey,
        subChartDataField = obj.subChartDataField
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

    var radius = Math.min(width, height) / 2;

    var color = d3.scale.category10();

    var pie = d3.layout.pie()
        .value(function (d) {
            return d['impressions'];
        })
        .sort(null);

    var arc = d3.svg.arc()
        .innerRadius(radius - 150)
        .outerRadius(radius - 10);

    var svg = chartPlaceHolder.append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    /*d3.tsv("data.tsv", type, function (error, data) {*/

        var path = svg.datum(data)
            .selectAll("path")
            .data(pie)
            .enter().append("path")
            .attr("fill", function (d, i) {
                return color(i);
            })
            .attr("d", arc)
            .attr("class", 'arc')
            .on("mousemove",function(d) {
                var
                    mouse = d3.mouse(chartPlaceHolder[0][0]),
                    mousex = mouse[0] + 15 + margin.left,
                    mousey = mouse[1] + 15 + margin.top
                    ;
                tooltip.style({display: 'block', left: mousex + "px", top: mousey + "px"});

                tooltip.html(function () {
                    return axis.xLabel + " :" + d.data[axisXkey] + "</br>" +
                        axis.yLabel + " :" + d.data[axisYkey] + "</br>"
                        ;
                });
            })
            .on("mouseover",function(d,i){
                svg.selectAll(".arc")
                    .transition()
                    .duration(250)
                    .attr("opacity", function(d, j) {
                        return j != i ? 0.6 : 1;
                });
            })
            .on("mouseout",function(d,i){
                svg.selectAll(".arc")
                    .transition()
                    .duration(250)
                    .attr("opacity", "1");
                tooltip.style('display','none');
            })
            ;

        d3.selectAll("input")
            .on("change", change);

        var timeout = setTimeout(function () {
            d3.select("input[value=\"oranges\"]").property("checked", true).each(change);
        }, 2000);

        function change() {
            var value = this.value;
            clearTimeout(timeout);
            pie.value(function (d) {
                return d[value];
            }); // change the value function
            path = path.data(pie); // compute the new angles
            path.attr("d", arc); // redraw the arcs
        }
  /*  });*/

    function type(d) {
        d.apples = +d.apples;
        d.oranges = +d.oranges;
        return d;
    }

}