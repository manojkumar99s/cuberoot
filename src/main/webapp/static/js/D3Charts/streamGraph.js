/*
* chart(targetID, dataObj, color, axisXkey, axisYkey, divRatio, nestKey, dimension, axis){
*
* */
function streamGraphChart(obj){

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
        scaleDetails = obj.axis.scaleDetails || {},
        division = scaleDetails.division,
        strokecolor = "#000";

        processedData = dataObj.improveData({
            data : dataObj.data,
            axisXkey : axisXkey,
            axisYkey : axisYkey,
            nestKey : nestKey,
            division : division
        }),
        format = d3.time.format("%m/%d/%y"),
        margin = {top: 10, right: 10, bottom: 45, left: 45}
    ;

    if(!!obj.margin){
        margin = obj.margin;
    }

    var
        chartPlaceHolder = d3.select("#"+obj.targetID),
        width = parseInt(chartPlaceHolder[0][0].offsetWidth * parseInt(dimensions.width)/100) - margin.left - margin.right,
        outerHeight = width * parseInt(dimensions.height)/100,
        legendH = 0,
        height = legendH + outerHeight - margin.top - margin.bottom,


        numberScale = scaleDetails.numberScale,

    //All axis  initialization >
        x = d3.time.scale().range([0, width]),
        y = d3.scale.linear().range([height-10, 0]),
        z = d3.scale.category10(),

        xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .ticks(d3.time.days)
            .tickFormat(function(d) { return d3.time.format('%b %d')(new Date(d)); })
           ,

        yAxis = d3.svg.axis()
            .scale(y),



        tooltip = chartPlaceHolder
            .append("div")
            .attr({'class':'chartTooltip'}),

        dateExtent = d3.extent(data, function(d) { return d[axisXkey]; })
    ;

    x.domain([dateExtent[0]-1, dateExtent[1]])//.nice();
    y.domain([0, d3.max(data, function(d) { return d.y0 + d.y; })]).nice();

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


    var formatDate = function(date){
        var
            m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"),
            d1= new Date(date)
        ;
        return  d1.getDate()+' '+m_names[d1.getMonth()];
    };

    var formatDateRange=function(dates){
        var
            m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"),
            d1=dates[0],
            d2=dates[1],

            d1_str = d1.getDate()+' '+m_names[d1.getMonth()],
            d2_str = d2.getDate()+' '+m_names[d2.getMonth()]
            ;


        return d1_str+' - '+d2_str;
    };

    /*var graph = d3.json(jsonPath, function(data) {*/

        svg.selectAll(".layer")
            .data(processedData)
            .enter()
            .append('g')
            //.attr({'style':'display:none;'})
/*            .on("mousemove",function(d) {
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
            })*/
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

/*        svg.selectAll("g.dot")
            .data(processedData)
            .enter().append("g")
            .attr("class", "dot")
            .selectAll("circle")
            .data(function(d) {
                return d.values; })
            .enter().append("circle")
            .attr("r", 2)
            .style({fill:function(d,i){ return z(0);} })
            .attr("cx", function(d,i) {
                return x(d[axisXkey]); })
            .attr("cy", function(d,i) {
                return d.y0 + d.y; })
            .on("mouseover",function(d,i){

            })
        ;*/

    var dataKeys = [];
    dataKeys.push(axisXkey);
    dataKeys.push(axisYkey);

    var showTooltip = function(d,i,mouse,dataKeys){
        mousex = mouse[0] + 5 + margin.left;
        mousey = mouse[1] + 5 + margin.top;

        //debugger
        var
            invertedx = x.invert(mouse[0]),
            selected = (d.values),
            currentDataSet,
            htmlStr = ""

            ;
        invertedx = invertedx.getMonth() + invertedx.getDate();


        for (var k = 0; k < selected.length; k++) {
            datearray[k] = selected[k][axisXkey];
            datearray[k] = datearray[k].getMonth() + datearray[k].getDate();
        }

        mousedate = datearray.indexOf(invertedx);
        pro = d.values[mousedate].impressions*division;

        currentDataSet = d.values[mousedate];
        htmlStr = "";
        for(i in currentDataSet){
            if(
                (Math.ceil(currentDataSet[i])!==0 || dataKeys.indexOf(i)!=-1)&&
                i.indexOf('hashKey')==-1 &&
                i!=='y' &&
                i!=='y0'
            ) {

                if(i==="date"){
                    htmlStr += i + ": " + formatDate(currentDataSet[i])  + "</br>";
                }
                else if(i==="impressions"){
                    htmlStr += i + ": " + Math.round(currentDataSet[i] * division)  + "</br>";
                }
                else {
                    htmlStr += i + ": " + currentDataSet[i] + "</br>";
                }
            }
        }

        tooltip.html(htmlStr).style({display: 'block', left: mousex + "px", top: mousey + "px",visibility:"visible"});

    };

    var
        legendBlock
    ;

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
        .attr({'class':'legend'})
        .on("mouseover",function(d,i){

            svg.selectAll(".layer")
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

            mouse = d3.mouse(this);

           /* showTooltip(d,i,mouse,dataKeys);*/


        })
        .on("mouseout", function(d, i) {
            svg.selectAll(".layer")
                .transition()
                .duration(250)
                .attr({"opacity": "1","stroke-width":0});
            d3.select(this)
                .classed("hover", false)
                .attr("stroke-width", "0px");
            /*tooltip.style({display: 'none'});*/
        });

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

        if(axis.x == true) {

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + (height - margin.top) + ")")
                .call(xAxis)
                .selectAll("text")
                .attr("y", 15)
                .attr("x", 25 * -1)
                .attr("dy", ".15em")
                .attr("transform", "rotate(-90)")
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
            ;
            if(!!axis.yLabel) {
                svg.append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 0 - (margin.left - 10))
                    .attr("x", 0 - (height / 2))
                    .attr("dy", "1em")
                    .style("text-anchor", "middle")
                    .text(axis.yLabel)
                ;
            }

            if(!!scaleDetails.numberScale) {
                svg.append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 0 - (margin.left - 30))
                    .attr("x", 0 - (height / 2))
                    .attr("dy", "1em")
                    .style({"text-anchor": "middle", 'font-size': '11px'})
                    .text("(in " + scaleDetails.numberScale + ")")
                ;
            }

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

                d3.select(this)
                    .classed("hover", true)
                    .attr("stroke", strokecolor)
                    .attr("stroke-width", "0.5px");

                mouse = d3.mouse(this);
                showTooltip(d,i,mouse,dataKeys);

            })
            .on("mouseout", function(d, i) {
                svg.selectAll(".layer")
                    .transition()
                    .duration(250)
                    .attr("opacity", "1");
                d3.select(this)
                    .classed("hover", false)
                    .attr("stroke-width", "0px");
                tooltip.style({'display':'none'});
            });

    /*});*/
}