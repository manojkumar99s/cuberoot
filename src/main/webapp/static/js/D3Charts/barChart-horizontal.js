function barChartHorizontal(obj) {
    var
        dimension = obj.dimension,
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
    var z = d3.scale.category10();

    var chart = document.getElementById(obj.targetID),
        axisMargin = 20,
        valueMargin = 4,
        barHeight = (height - axisMargin - margin.left - margin.right) * 0.8 / data.length,
        barPadding = (height - axisMargin - margin.left - margin.right) * 0.2 / data.length,
        data, bar, svg, scale, xAxis, labelWidth = 0;

    var max = d3.max(data.map(function (d) {
        return d[axisXkey];
    }));

    svg = chartPlaceHolder
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform","translate(" + margin.left + "," + margin.top + ")")
    ;

    bar = svg.selectAll("g")
        .data(data)
        .enter()
        .append("g");

    bar.attr("class", "bar")
        .attr("transform", function (d, i) {
            return "translate(" + margin.left + "," + (i * (barHeight + barPadding) ) + ")";
        })
        .style('fill',function(d,i){
            return z(i);
        })
        .on("mousemove",function(d) {
            pathData = d;

            mouse = d3.mouse(chartPlaceHolder[0][0]);
            mousex = mouse[0] + 15 ;
            mousey = mouse[1] + 15 ;

            tooltip.style({display: 'block', left: mousex + "px", top: mousey + "px"});
            tooltip.html(function () {
                return axis.xLabel+" :" + pathData[axisXkey]  + "</br>" +
                    axis.yLabel+" :" + pathData[axisYkey]  + "</br>"
                    ;
            })
        })
        .on("mouseout",function(d) {
            tooltip.style('display','none');
        })
        .on("click",function(d){
            if(!!subChartDataField) {
                angular.element(document.getElementById('charts')).scope()
                    .loadChart('subPieChart', {
                        data: d[subChartDataField]
                    });
            }
        });

    bar.append("text")
        .text(function (d) {
            return d[axisYkey];
        })
        .each(function () {
            labelWidth = Math.ceil(Math.max(labelWidth, this.getBBox().width));
        })
        .attr("class", "value")
        .attr("y", barHeight / 2)
        .attr("dx", (valueMargin * -2) + labelWidth) //margin right
        .attr("dy", ".35em") //vertical align middle
        .attr("text-anchor", "end")
        .style('font-size','12px')
        .attr("x", valueMargin);

    scale = d3.scale.linear()
        .domain([0, max])
        .range([0, width - margin.left - margin.right - labelWidth])
    ;

    xAxis = d3.svg.axis()
        .scale(scale)
        /*.tickSize(-height + margin.left - margin.right + axisMargin)*/
        .orient('bottom')
    ;

    var y = d3.scale.linear().range([(height - margin.top), 0]);

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
    ;

    svg.append("g",":first-child")
        .attr("class", "y axis")
        .call(yAxis)
        .attr("transform", "translate(" + (labelWidth + margin.left) + ", 0)")
        .selectAll('text')
        .text("");
    ;

    bar.append("rect")
        .attr("transform", "translate(" + labelWidth + ", 0)")
        .attr("height", barHeight)
        .attr("width", function (d) {
            return scale(d[axisXkey]);
        });

    var x_Axis = svg.insert("g", ":first-child")
        .attr("class", "axis")
        .attr("transform", "translate(" + (margin.left + labelWidth) + "," + (height-margin.top) + ")")
        .call(xAxis)
    ;


    x_Axis.selectAll('text')
        .attr('transform','rotate(-45)')
        .attr('x',-10)
        .attr('y',0)
        .style('text-anchor','end')
    ;

    x_Axis.selectAll('line');

}