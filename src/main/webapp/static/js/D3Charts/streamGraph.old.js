function getColorRange(colorFamily){
    if (colorFamily == "blue") {
        colorrange = ["#045A8D", "#2B8CBE", "#74A9CF", "#A6BDDB", "#D0D1E6", "#F1EEF6"];
    }
    else if (colorFamily == "pink") {
        colorrange = ["#980043", "#DD1C77", "#DF65B0", "#C994C7", "#D4B9DA", "#F1EEF6"];
    }
    else if (colorFamily == "orange") {
        colorrange = ["#B30000", "#E34A33", "#FC8D59", "#FDBB84", "#FDD49E", "#FEF0D9"];
    }
    else if(colorFamily == "multiple"){
        colorrange =["#045A8D","#980043","#B30000","#ff0000","#000000","#00FF00","#006600","#0066cc","#330000","#33ff00","#660066","#669966","#ff0066"];
    }
    return colorrange;
}

function chart(targetID, jsonPath, color, axisXkey, axisYkey, divRatio, nestKey) {
    //debugger;
    var
        datearray = [],
        colorrange = [],

    //core variables for chart
        colorrange = getColorRange(color),
        strokecolor = "#aaaaaa",
        format = d3.time.format("%m/%d/%y"),
        margin = {top: 10, right: 10, bottom: 45, left: 45},
        chartPlaceHolder = d3.select("#"+targetID),
        width = parseInt(chartPlaceHolder[0][0].offsetWidth) - margin.left - margin.right,
        chart1H = 400,
        chart2H = 0,
        legendH = 50,
        height = legendH + chart1H + chart2H - margin.top - margin.bottom,
        division = divRatio,


    //extras for chart
        tooltip = d3.select("body")
            .append("div")
            .attr("class", "remove")
            .style("position", "absolute")
            .style("z-index", "20")
            .style("visibility", "hidden")
            .style("top", "30px")
            .style("left", "55px"),

    //All axis  initialization >
        x = d3.time.scale().range([0, width]),
        y = d3.scale.linear().range([chart1H-10, 0]),
        y2 = d3.scale.linear().range([chart2H-10, 0]),

        z = d3.scale.category20(),
        xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .ticks(d3.time.days)
            .tickFormat(function(d) { return d3.time.format('%b %d')(new Date(d)); }),

        yAxis = d3.svg.axis()
            .scale(y),

        y2Axis = d3.svg.axis()
            .scale(y2),

    //All axis  initialization />

        stack = d3.layout.stack()
            .offset("zero")
            .values(function(d) { return d.values; })
            .x(function(d) { return d[axisXkey]; })
            .y(function(d) { return d[axisYkey]; }),

        stack2 = d3.layout.stack()
            .offset("zero")
            .values(function(d) { return d.values; })
            .x(function(d) { return d[axisXkey]; })
            .y(function(d) { return d['cpm']; }),



        tooltip = chartPlaceHolder
            .append("div")
            .attr({'class':'chartTooltip'});

    var nest = d3.nest()
            .key(function(d) { return d[nestKey]; })
            .sortKeys(d3.descending)
        ;

    var area = d3.svg.area()
        //.defined(function(d) { return !isNaN(d[axisYkey]); })
            .interpolate("monotone")
            .x(function(d) { return x(d[axisXkey]); })
            .y0(function(d) { return y(d.y0); })
            .y1(function(d) { return y(d.y0 + d.y); })
        ;


    var area2 = d3.svg.area()
        //.defined(function(d) { return !isNaN(d[axisYkey]); })
            .interpolate("monotone")
            .x(function(d) { return x(d[axisXkey]); })
            .y0(function(d) { return y(d.y0); })
            .y1(function(d) { return y(d.y0 + d.y); })
        ;

    //debugger;
    chartPlaceHolder.selectAll('svg').style({'display':'none'});


    var chartIdStr =  axisYkey + '-' + axisXkey + 'Chart';
    var chartSVGBlock = d3.select('#'+chartIdStr);
        if(!chartSVGBlock[0][0])
        {
            chartSVGBlock = chartPlaceHolder.append("svg")
            .attr({'id': axisYkey + '-' + axisXkey + 'Chart'});
        }
        else{
            chartSVGBlock.style({'display':'block'});
            return;
        }

    var svg =
        chartSVGBlock.attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    ;

/*    var svg2 =
        chartSVGBlock
            .append("g")
            .attr({"id":"eCPMChart","transform": "translate(" + margin.left + "," + (chart1H + margin.top + margin.bottom) +")"})
    ;*/

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

    var graph = d3.json(jsonPath, function(data) {

        data.forEach(function(d) {

            d[axisXkey] = new Date(d[axisXkey]);
            d[axisYkey] = parseInt(d[axisYkey])/division;

/*            (d.clicks==null) ? delete d.clicks : '';
            (d.channel==null) ? delete d.channel : '';
            (d.audience_segment==null) ? delete d.audience_segment : '';
            (d.city==null) ? delete d.city : '';
            (d.os==null) ? delete d.os : '';
            (d.device_type==null) ? delete d.device_type : '';
            (d.conversions==null) ? delete d.conversions : '';
            (d.cost==null) ? delete d.cost : '';*/
        });

        data = data.sort(function (a, b) {
            if (a[axisXkey] > b[axisXkey]) {
                return 1;
            }
            if (a[axisXkey] < b[axisXkey]) {
                return -1;
            }
            // a must be equal to b
            return 0;
        });
        
        var layers = stack(nest.entries(data));

        var
            minDate = d3.min(data, function (d) {
                return new Date(d[axisXkey]);
            }),

            maxDate = d3.max(data, function (d) {
                return new Date(d[axisXkey]);
            }),

            minImpression = d3.min(data, function (d) {
                return +d[axisYkey];
            }),

            maxImpression = d3.max(data, function (d) {
                return +d[axisYkey];
            })
            ;



        var totalaxisYkey=0, processedData = [], dateRange=[], channel="" ;

        layers.forEach(function(d){

            d.values.forEach(function(key){
                totalaxisYkey += key[axisYkey];
                dateRange = d3.extent(d.values, function(e) { return e[axisXkey]; });

                if(
                    key[axisYkey] > 0 &&
                    !!key.channel &&
                    key.channel!=="undefined" &&
                    channel.indexOf(key.channel) === -1 &&
                    key.channel!==""
                ){
                    if(channel.length>0){
                        channel+=",";
                    }
                    channel += key.channel;
                }

            });

            d.totalaxisYkey = Math.round(totalaxisYkey*division);
            d.channel = channel;
            d.dateRange = dateRange;

            processedData.push(d);
        });

        processedData = processedData.sort(function (a, b) {
            if (a.totalaxisYkey > b.totalaxisYkey) {
                return 1;
            }
            if (a.totalaxisYkey < b.totalaxisYkey) {
                return -1;
            }
            // a must be equal to b
            return 0;
        });

        //debugger;
        //processedData = processedData.reverse();

        x.domain(d3.extent(data, function(d) { return d[axisXkey]; }));
        y.domain([0, d3.max(data, function(d) { return d.y0 + d.y; })]);
        y2.domain([0, d3.max(data, function(d) { return d.y0 + d.y; })]);


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
            .attr({"class":"layer"})
            .attr("d", function(d) {
                //return area(d.values);
                var pathStringValue = area(d.values);
                if(pathStringValue.indexOf('NaN') > -1) {
                    //console.log(d.values)
                    // debugger;
                    /*                  pathStringValue = pathStringValue.replace(/,NaN/g,',');
                     pathStringValue = pathStringValue.replace(/NaN,/g,'0,');
                     pathStringValue = pathStringValue.replace(/NaN/g,'0');*/
                    //console.log(pathStringValue)
                    console.log(d.key);
                }
                return pathStringValue;
            })
            .style("fill", function(d, i) {return z(i); })

        ;

        svg2.selectAll(".layer")
            .data(processedData)
            .enter()
            .append('g')
            .append("path")
            .attr({"class":"eCPMlayer"})
            .attr("d", function(d) {
                return area(d.values);
            })
            .style("fill", function(d, i) {return z(i); })
        ;

        /*
         svg.selectAll(".dot")
         .data(data.filter(function(d) { return d; }))
         .enter().append("circle")
         .attr("class", "dot")
         .attr("cx", line.x())
         .attr("cy", line.y())
         .attr("r", 3.5)
         .on("mouseover",function(d,i){
         pathData = d;
         debugger
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
         })
         */


        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (chart1H-margin.top) + ")")
            .call(xAxis)
            .selectAll("text")
            .attr("y", 0)
            .attr("x", (margin.bottom+3)*-1 )
            .attr("dy", ".15em")
            .attr("transform", "rotate(-45)")
            .style("text-anchor", "start");;

        /*        svg.append("g")
         .attr("class", "y axis")
         .attr("transform", "translate(" + width + ", 0)")
         .call(yAxis.orient("right"));*/

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis.orient("left"));

        svg.selectAll(".layer")
            .attr("opacity", 1)
            .on("mouseover", function(d, i) {
                svg.selectAll(".layer").transition()
                    .duration(250)
                    .attr("opacity", function(d, j) {
                        return j != i ? 0.6 : 1;
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
                    tooltip.html( "<p>" + d.key + "<br>" + pro + "</p>" ).style("visibility", "visible");

            })
            .on("mouseout", function(d, i) {
                svg.selectAll(".layer")
                    .transition()
                    .duration(250)
                    .attr("opacity", "1");
                d3.select(this)
                    .classed("hover", false)
                    .attr("stroke-width", "0px");
                    tooltip.html( "<p>" + d.key + "<br>" + pro + "</p>" ).style("visibility", "hidden");
            });

        var vertical = chartPlaceHolder
            .append("div")
            .attr("class", "remove")
            .style("position", "absolute")
            .style("z-index", "19")
            .style("width", "1px")
            .style("height", height)
            .style("top", "10px")
            .style("bottom", "30px")
            .style("left", "0px")
            .style("background", "#fff");

        chartPlaceHolder
            .on("mousemove", function(){
                mousex = d3.mouse(this);
                mousex = mousex[0] + 5;
                vertical.style("left", mousex + "px" )})
            .on("mouseover", function(){
                mousex = d3.mouse(this);
                mousex = mousex[0] + 5;
                vertical.style("left", mousex + "px")});
    });
}