function barChart(obj) {

    var
        jsonpath = obj.jsonpath,
        dimension = obj.dimension,
        viewScope = obj.viewScope,
        commonService = obj.commonService,
        data = obj.data,
        chartPlaceHolder = d3.select("#"+obj.targetID),
        margin = {top: 20, right: 20, bottom: 20, left: 20},
        axis = obj.axis,
        axisXkey=axis.axisXkey,
        axisYkey=axis.axisYkey
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

// Parse the date / time
    var parseDate = d3.time.format("%Y-%m").parse;
    var y = d3.scale.linear().range([height, 0]);
    var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);



    /*var x = d3.scale.log().range([0,width]);*/
    var z = d3.scale.category10();
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")

        //.tickFormat(d3.time.format("%Y-%m"))
    ;

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10)
    ;

/*    var yAxis = d3.svg.axis()
        .scale(y)
        .orient('left')
        .ticks(0, 1000)
    ;*/
//debugger;
    chartPlaceHolder.selectAll('svg').style({'display':'none'});

    var svg = chartPlaceHolder.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  /*  d3.json(jsonpath, function (error, data) {*/

        x.domain(data.map(function (d) {
            return d[axisXkey];
        }));

        y.domain([0.5, d3.max(data, function (d) {
            return d[axisYkey];
        })]);

        var x_Axis = svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
        ;

        x_Axis.call(xAxis)
            .selectAll("text")
            .style("text-anchor", "middle")
            .attr('opacity','1')
            .attr("dx", "-0.5em")
            .attr("dy", "-.55em")
            .attr("y", 20)
            /*.attr("transform", "rotate(-90)")*/
        ;
        //debugger;
/*        x_Axis.append("text")
            .text(axis.xLabel)
            .style("text-anchor", "middle")
            .attr({"x":(width / 2)})
            .attr({'y':20})
        ;*/


    /*        svg
     .append('path')
     .attr({
     "transform": "translate(0," + height + ")",
     "width":width
     })
     .append("text")
     .attr('y',-20)
     .style("text-anchor", "end")
     .text(axis.xLabel)*/



        ;



        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            //.attr("transform", "rotate(-90)")
            .attr("y", -20)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text(axis.yLabel);

        var rects = svg.selectAll(".bars")
            .data(data)
            .enter().append("rect")
            .on("mousemove",function(d) {
                //debugger;
                pathData = d;

                mouse = d3.mouse(this);
                mousex = mouse[0] + 15 + margin.left;
                mousey = mouse[1] + 15 + margin.top;
                // console.log(mouse);

                tooltip.style({display: 'block', left: mousex + "px", top: mousey + "px"});

                tooltip.html(function () {
                    return axis.xLabel+" :" + d[axisXkey]  + "</br>" +
                        axis.yLabel+" :" + d[axisYkey]  + "</br>"
                    ;
                })
            });


        rects.style("fill", function(d, i) {return z(i); })
            .attr({
                "x": function (d) {
                    return x(d[axisXkey]);
                },
                "width": x.rangeBand(),

                "y": function (d) {
                    return y(d[axisYkey]);
                },
                "height": function (d) {
                    return height - y(d[axisYkey]);
                },
                "class":"bars"
            })

            .on("mouseover", function(d, i) {
                svg.selectAll(".bars")
                .transition()
                .duration(250)
                .attr("opacity", function(d, j) {
                    return j != i ? 0.6 : 1;
                })
            })

            .on("mouseout", function(d, i) {
                svg.selectAll(".bars")
                    .transition()
                    .duration(250)
                    .attr("opacity", "1");
                d3.select(this)
                    .classed("hover", false)
                    /*.attr("stroke-width", "0px");*/
              //  tooltip.html( "<p>" + d.key + "<br>" + pro + "</p>" ).style("visibility", "hidden");
                tooltip.style({'display':'none'});
            })
            ;

/*        d3.selectAll('.bars').on("click",function(){
            angular.element(document.getElementById('charts')).scope().loadChart('subPieChart');
        });*/



   /* });*/

}