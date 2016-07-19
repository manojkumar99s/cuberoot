/*
* chart(targetID, dataObj, color, axisXkey, axisYkey, divRatio, nestKey, dimension, axis){
*
* */
function streamGraphChart(obj){

    /*
     targetID: 'eCPMChart',
     dataObj: {data: dataObj.data, improveData: improveData},
     axis: {
     axisXkey: "date",
     axisYkey: "10000000",
     'x': true,
     'y': true,
     'xLabel': 'Dates',
     'yLabel': 'Impressions',
     division: 1000000
     },
     dimensions: {width: '75%', height: '20%'},
     nestKey:"campaign_id"
     */
    var
        datearray = [],
    //core variables for chart
        data = obj.dataObj.data,
        dataObj = obj.dataObj,
        dimensions = obj.dimensions,
        axis = obj.axis,
        axisXkey = axis.axisXkey,
        axisYkey = axis.axisYkey,
        nestKey = obj.nestKey,

        processedData = dataObj.improveData({
            data : dataObj.data,
            axisXkey : axisXkey,
            axisYkey : axisYkey,
            nestKey : nestKey,
            division : axis.division
        }),
        //colorrange = getColorRange(color),
        strokecolor = "#aaaaaa",
        format = d3.time.format("%m/%d/%y"),
        margin = {top: 10, right: 10, bottom: 45, left: 45},
        chartPlaceHolder = d3.select("#"+obj.targetID),
        width = parseInt(chartPlaceHolder[0][0].offsetWidth * parseInt(dimensions.width)/100) - margin.left - margin.right,
        outerHeight = width * parseInt(dimensions.height)/100,
        legendH = 0,
        height = legendH + outerHeight - margin.top - margin.bottom,
        division = obj.axis.division,

    //All axis  initialization >
        x = d3.time.scale().range([0, width]),
        y = d3.scale.linear().range([height-10, 0]),
        z = d3.scale.category20(),

        xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .ticks(d3.time.days)
            .tickFormat(function(d) { return d3.time.format('%b %d')(new Date(d)); }),

        yAxis = d3.svg.axis()
            .scale(y),



        tooltip = chartPlaceHolder
            .append("div")
            .attr({'class':'chartTooltip'});

    x.domain(d3.extent(data, function(d) { return d[axisXkey]; }));
    y.domain([0, d3.max(data, function(d) { return d.y0 + d.y; })]);


    var area = d3.svg.area()
        //.defined(function(d) { return !isNaN(d[axisYkey]); })
            .interpolate("monotone")
            .x(function(d) { return x(d[axisXkey]); })
            .y0(function(d) { return y(d.y0); })
            .y1(function(d) { return y(d.y0 + d.y); })
    ;

    chartPlaceHolder.selectAll('svg').remove();

    var chartIdStr =  axisYkey + '-' + axisXkey + 'Chart';
    var chartSVGBlock = d3.select('#'+chartIdStr);

/*    if(!chartSVGBlock[0][0]){*/

        chartSVGBlock = chartPlaceHolder.append("svg")
            .attr({'id': axisYkey + '-' + axisXkey + 'Chart'});
    /*} else {
        chartSVGBlock.style({'display':'block'});
        return;
    }*/

    var svg =
            chartSVGBlock.attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        ;

    var formatDateRange=function(dates){
        var
            d1=dates[0],
            d2=dates[1],
            m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"),
            d1_str = d1.getDate()+' '+m_names[d1.getMonth()],
            d2_str = d2.getDate()+' '+m_names[d2.getMonth()]
            ;
        return d1_str+' - '+d2_str;
    };



    /*var graph = d3.json(jsonPath, function(data) {*/
       // debugger;



        svg.selectAll(".layer")
            .data(processedData)
            .enter()
            .append('g')
            //.attr({'style':'display:none;'})
            .on("mousemove",function(d) {
                //debugger
                pathData = d;

                mouse = d3.mouse(this);
                mousex = mouse[0] + 5 + margin.left;
                mousey = mouse[1] + 5 + margin.top;
                // console.log(mouse);

                tooltip.style({display: 'block', left: mousex + "px", top: mousey + "px"});

                tooltip.html(function () {
                    return "Tenure: " + formatDateRange(pathData.dateRange) + "</br>" +
                        "Channel:" + pathData.channel + "</br>" +
                        "Campaign Id :" + pathData.key;
                })
            })
            .append("path")
            //.attr("y", 100)
            .attr({"class":function(d){
                return "layer lyr-"+d.key;
            }})
            .attr("d", function(d) {
                return area(d.values);
            })
            .style("fill", function(d, i) {return z(i); })

        ;

       /* var
            legendBlock = chartPlaceHolder.insert('svg',":first-child").attr({ width:150}).style({'float':'right'}),
            legend = legendBlock.append('g')
            .attr({
                'class':'legends',
                'x':20,
                'y':20,
            });

/!*            svg.append('rect')
            .attr({'width':'200',height:200,'x':width-250,
                'y':-8})
            .style('fill', 'rgba(0,0,0,0.2)');*!/

        var nodes = legend.selectAll('g')
            .data(processedData)
            .enter()
            .append('g')
            .attr('class', 'legend')
            .append('text')
            .attr('x', 30)
            .attr('y', function(d, i){ return (i *  20) + 30;})
            .text(function(d){
                return d.key;
            });

            legend.selectAll('g')
            .append('rect')
            .attr('x', 10)
            .attr('y', function(d, i){ return (i *  20 ) +20;})
            .attr('width', 10)
            .attr('height', 10)
            .style('fill', function(d,i) {
                return z(i);
            });*/

    var
        legendBlock;

    if(!chartPlaceHolder.select('.legends')[0][0]){
        legendBlock = chartPlaceHolder.insert('div',":first-child")
            .attr({'class':'legends'})
            .style({'height':outerHeight+'px'})
    } else {
        legendBlock = chartPlaceHolder.select('.legends');
        legendBlock.html("");
    }

    var nodes = legendBlock.selectAll('div')
        .data(processedData)
        .enter()
        .append('div')
        .filter(function(d){/*console.log(d);console.log(axisXkey+" : "+d[axisXkey]+", "+axisYkey+" : "+d[axisYkey]); */return (d['totalaxisYkey'] > 0)})
        .attr({'class':'legend'})
        .on("mouseover",function(d,i){

            d3.select(this)
                .classed("hover", true)
                .attr("stroke-width", "1px")
            ;

            svg.selectAll(".layer").transition()
                .duration(250)
                .attr("opacity", function(d, j) {
                    return j != i ? 0.4 : 1;
            });
        })
        .on("mouseout", function(d, i) {
            svg.selectAll(".layer")
                .transition()
                .duration(250)
                .attr("opacity", "1");
            d3.select(this)
                .classed("hover", false)
                .attr("stroke-width", "0px");
            tooltip.style({display: 'none'});
        })

    .on("mousemove",function(d) {
            //debugger
            pathData = d;

            mouse = d3.mouse(this);
            mousex = mouse[0] + 5 + margin.left;
            mousey = mouse[1] + 5 + margin.top;
            // console.log(mouse);

            tooltip.style({display: 'block', left: mousex + "px", top: mousey + "px"});

            tooltip.html(function () {
                return "Tenure: " + formatDateRange(pathData.dateRange) + "</br>" +
                    "Channel:" + pathData.channel + "</br>" +
                    "Campaign Id :" + pathData.key;
            })
        })

    nodes
        .append('span')
        .classed('colorBlk',true)
        .style({'background': function(d,i) {
            return z(i);
        }});

    nodes
        .append('span')
        .attr('class', 'txt')
        .text(function(d){
            return d.key;
        })
;




   /* code for dot implementation*/
  /*  var
        xScale = d3.time.scale().range([0, width]).domain(d3.extent(data, function(d) { return d[axisXkey]; })),
        yScale = d3.scale.linear().range([height-10, 0]).domain([0, d3.max(data, function(d) { return d[axisYkey] })]),

        lineGen = d3.svg.line()
        .x(function (d) {
            //debugger
            return xScale(d[axisXkey]);
        })
        //.y0(Obj.HEIGHT)
        .y(function (d) {
            //debugger
            return yScale(d[axisYkey]);
        })
    ;

         svg.selectAll(".dot")
             .data(data.filter(function(d) { return d; }))
             .enter().append("circle")
             .attr("class", "dot")
             .attr("cx", function(){return lineGen.x()})
             .attr("cy", function(){return lineGen.y()})
             .attr("r", 3.5)
             .on("mouseover",function(d,i){
                 pathData = d;
                 //debugger
                 mouse = d3.mouse(this);
                 mousex = mouse[0] + 5;
                 mousey = mouse[1] + 5;
                 //console.log(mouse);

                 tooltip.style({display:'block', left:mousex + "px", top: mousey + "px"});

                 tooltip.html(function(){
                 return "Total Impression: "+pathData.impression+"</br> " +
                     "Date: "+pathData[axisXkey]+"</br>" +
                     "Channel:"+pathData.channel+"</br>" +
                     "Campaign Id :"+pathData[nestKey];
                 })
         });*/


        if(axis.x == true) {
            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + (height - margin.top) + ")")
                .call(xAxis)
                .selectAll("text")
                .attr("y", 0)
                .attr("x", (margin.bottom + 3) * -1)
                .attr("dy", ".15em")
                .attr("transform", "rotate(-45)")
                .style("text-anchor", "middle")
            ;

            svg.append("text")
                .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom) + ")")
                .style("text-anchor", "middle")
                .text(axis.xLabel);
        }

        if(axis.y == true) {
            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis.orient("left"))

/*            svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("height",height)
                /!*.attr("y", -20)*!/
                /!*.attr("dy", ".71em")*!/
                .style("text-anchor", "middle")
                .text(axis.yLabel);*/

            svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0 - margin.left)
                .attr("x",0 - (height / 2))
                .attr("dy", "1em")
                .style("text-anchor", "middle")
                .text(axis.yLabel);


            ;
        }
        svg.selectAll(".layer")
            .attr("opacity", 1)
            .on("mouseover", function(d, i) {
                svg.selectAll(".layer").transition()
                    .duration(250)
                    .attr("opacity", function(d, j) {
                        return j != i ? 0.4 : 1;
                    })})

            .on("mousemove", function(d, i) {
                mousex = d3.mouse(this);
                mousex = mousex[0];
                var invertedx = x.invert(mousex);
                invertedx = invertedx.getMonth() + invertedx.getDate();
                var selected = (d.values);
                for (var k = 0; k < selected.length; k++) {
                    datearray[k] = selected[k][axisXkey]
                    datearray[k] = datearray[k].getMonth() + datearray[k].getDate();
                }

                mousedate = datearray.indexOf(invertedx);
                pro = d.values[mousedate].value;

                d3.select(this)
                    .classed("hover", true)
                    .attr("stroke", strokecolor)
                    .attr("stroke-width", "0.5px");

            })
            .on("mouseout", function(d, i) {
                svg.selectAll(".layer")
                    .transition()
                    .duration(250)
                    .attr("opacity", "1");
                d3.select(this)
                    .classed("hover", false)
                    .attr("stroke-width", "0px");
            });








    /*});*/
}