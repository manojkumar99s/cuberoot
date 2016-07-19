function multilinechart(obj) {

    //targetID, dataObj, color, axisXkey, axisYkey, divRatio, nestKey
    var
        targetID = obj.targetID,
        jsonpath = obj.jsonpath,
        dimension = obj.dimension,
        viewScope = obj.viewScope,
        commonService = obj.commonService,
        data = obj.data,
        chartPlaceHolder = d3.select("#"+obj.targetID),
        margin = {top: 20, right: 20, bottom: 20, left: 20},
        axis = obj.axis,
        axisXkey = axis.axisXkey,
        axisYkey = axis.axisYkey
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
   /* d3.json(jsonPath, function (error, data) {*/

        function init() {
            var Obj = {};
            this.format = d3.time.format("%m/%d/%y");
            this.oneDay = 1000 * 60 * 60 * 24;

            data.forEach(function (d) {
                var
                    now = new Date(d.date),
                    yearStartDay = new Date(now.getFullYear(), 0, 0),
                    diff = now - yearStartDay,
                    day = Math.floor(diff / this.oneDay)
                    ;
                d.date = new Date(d.date);
                d.impression = +d.impression;
                //debugger;
            });

                this.WIDTH = 1000,
                this.HEIGHT = 500,
                this.MARGINS = {
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 80
                },

                this.xScale = d3.time.scale().range([this.MARGINS.left, this.WIDTH - this.MARGINS.right]).domain(d3.extent(data, function(d) { return d[axisXkey]; })),

                this.yScale = d3.scale.linear().range([this.HEIGHT - this.MARGINS.top, this.MARGINS.bottom]).domain(d3.extent(data, function(d) { return d[axisYkey]; })),

            this.colorrange = ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"];

            this.vis = d3.select("#"+targetID).append('svg').datum(data).attr({'width': this.WIDTH, 'height': this.HEIGHT});

            this.xAxis = d3.svg.axis()
                .scale(this.xScale)
                .orient('bottom')
                .ticks(d3.time.days)
                .tickFormat(function (d) {
                    return d3.time.format('%b %d')(new Date(d));
                });
            ;
            this.yAxis = d3.svg.axis()
                .scale(this.yScale)
                .orient("left");

            this.vis.append("svg:g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + (this.HEIGHT - this.MARGINS.bottom) + ")")
                .call(this.xAxis);

            this.vis.append("svg:g")
                .attr("class", "y axis")
                .attr("transform", "translate(" + (this.MARGINS.left) + ",0)")
                .call(this.yAxis);


            this.xAxis.tickFormat(function (d) {
                return d3.time.format('%a %d')(new Date(d));
            });

            return this;

        };

        var Obj = new init();
        var lineGen = d3.svg.line()
                .defined(function (d) {
                    return d;
                })
                .x(function (d) {
                    //debugger
                    return Obj.xScale(d.date);
                })
                //.y0(Obj.HEIGHT)
                .y(function (d) {
                    //debugger
                    return Obj.yScale(d.impression);
                })
        //.interpolate("monotone")
            ;

        /*
         var area = d3.svg.area()
         .defined(lineGen.defined())
         .x(lineGen.x())
         .y1(lineGen.y())
         .y0(y(0));
         */

        var dataNestCampaignId = d3.nest()
            .key(function (d) {
                return d.campaign_id;
            })
            .entries(data);


        dataNestCampaignId.forEach(function (d, i) {
            Obj.vis.append('svg:path')
                .attr('d', lineGen(d.values))
                .attr('stroke', Obj.colorrange[i])
                .attr('stroke-width', 2)
                .attr('fill', 'none')
                .on("mouseover", function () {
                    pathData = d.values[i];

                    mouse = d3.mouse(this);
                    mousex = mouse[0] + 5;
                    mousey = mouse[1] + 5;
                    //console.log(mouse);

                    vertical.style({display: 'block', left: mousex + "px", top: mousey + "px"});

                    vertical.html(function () {
                        return "Total Impression: " + pathData.impression + "</br> " +
                            "Date: " + pathData.date + "</br>" +
                            "Channel:" + pathData.channel + "</br>" +
                            "Campaign Id :" + pathData.campaign_id;
                    })
                })
                .on("mouseout", function () {
                    vertical.style({
                        display: 'none'
                    });
                });
        });
/*    });*/

}