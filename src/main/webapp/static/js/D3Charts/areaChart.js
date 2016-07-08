d3.json('static/dummyData/performance.json',function(error,data) {


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
            d.day = day;
            d.date = new Date(d.date);
            d.impression = +d.impression;
            //debugger;
        });

        this.minDay = d3.min(data, function (d) {
            return new Date(d.day);
        }),

        this.maxDay = d3.max(data, function (d) {
            return new Date(d.day);
        }),

        this.minDate = d3.min(data, function (d) {
            return new Date(d.date);
        }),

        this.maxDate = d3.max(data, function (d) {
            return new Date(d.date);
        }),

        this.minImpression = d3.min(data, function (d) {
            return +d.impression;
        }),

        this.maxImpression = d3.max(data, function (d) {
            return +d.impression;
        }),


        this.WIDTH = 1000,
        this.HEIGHT = 500,
        this.MARGINS = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 80
        },

        this.xScale = d3.time.scale().range([this.MARGINS.left, this.WIDTH - this.MARGINS.right]).domain([this.minDate, this.maxDate]),

        this.yScale = d3.scale.linear().range([this.HEIGHT - this.MARGINS.top, this.MARGINS.bottom]).domain([this.minImpression, this.maxImpression]),

        this.colorrange = ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"];

        this.vis = d3.select("#areaChart").append('svg').datum(data).attr({'width': this.WIDTH, 'height': this.HEIGHT});

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

    var Obj =  new init();
    var vertical = d3.select("#areaChart")
        .append("div")
        .attr({'class':'chartTooltip'});

    //chart script starts

    var lineGen = d3.svg.line()
        .defined(function(d) { return d; })
        .x(function(d) {
            //debugger
            return Obj.xScale(d.date);
        })
        //.y0(Obj.HEIGHT)
        .y(function(d) {
            //debugger
            return Obj.yScale(d.impression);
        })
        .interpolate("monotone")
        ;


   var area = d3.svg.area()
        .defined(lineGen.defined())
        .x(lineGen.x())
        .y1(lineGen.y())
        .y0(lineGen.y(Obj.HEIGHT-Obj.MARGINS.bottom))
    ;

    
    var dataNestCampaignId = d3.nest()
        .key(function(d) {
            return d.campaign_id;
        })
        .entries(data);



     dataNestCampaignId.forEach(function(d, i) {
         var vis = Obj.vis;

         vis.append("svg:path")
             .attr("class","line")
             .attr('d', lineGen(d.values))
             .attr('stroke', Obj.colorrange[i])
             .attr('stroke-width', 2)
             .attr('fill', 'none')
         ;

            vis.append('svg:path')
               .attr("class", "area")
               .attr("d", area)
               .attr('fill', Obj.colorrange[i])
            ;



         vis.selectAll(".dot")
             .data(data.filter(function(d) { return d; }))
             .enter().append("circle")
             .attr("class", "dot")
             .attr("cx", area.x())
             .attr("cy", area.y())
             .attr("r", 3.5)
        /* .attr('d', lineGen(d.values))
               .attr('stroke', Obj.colorrange[i])
               .attr('stroke-width', 2)
               .attr('fill', 'none')
               */
               .on("mouseover",function(){
                   (function(d,i){
                       //debugger
                       pathData = d.values[i];
                       //console.log(pathData);
                       mouse = d3.mouse(this);
                       mousex = mouse[0] + 5;
                       mousey = mouse[1] + 5;
                       //console.log(mouse);

                       tooltip.style({display:'block', left:mousex + "px", top: mousey + "px"});

                       tooltip.html(function(d,i){
                           return "Total Impression: "+pathData.impression+"</br> " +
                               "Date: "+pathData.date+"</br>" +
                               "Channel:"+pathData.channel+"</br>" +
                               "Campaign Id :"+pathData.campaign_id;
                       });
                   })(d,i);
               })
               .on("mouseout",function(){
                   vertical.style({display:'none'
               });
           });/**/
       });
});