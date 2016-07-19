'use strict';
angular.module('CubeRootApp').
service('commonService',['$http','$q',function($http,$q){

    var
        campainIdsUrl = '/b1/report/16/',
        dates = {},
        self = {}
    ;



    self = {
        sendData : function(url, $data,successCallback,errorCallback) {
            try {
                    $http({
                        method: 'POST',
                        data: $data,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        url: url
                    }).then(successCallback, errorCallback);

                }  catch(e){
                    console.log("Error sending data : "+e)
            }
        },
        translateToWord:function(){

        },
        showLoading : function(){
            var
                disabledScr=d3.select('body #disabledScr')
            ;

            if(!disabledScr[0][0]) {
                d3.select('body')
                    .append('div')
                    .attr({'class': 'disabledScr', 'id': 'disabledScr'})
                    .append('img')
                    .attr({'class': 'loadingRing', 'src': 'static/images/ring.gif'});
            } else {
                disabledScr.style({'display':'table'});
            }
        },
        hideLoading:function(){
            var
                disabledScr=d3.select('body #disabledScr')
            ;
            if(!!disabledScr[0][0]){
                disabledScr.style({'display':'none'});
            }
        },
        addInteractivity: function (obj){
            var
                chartBlock = d3.select("#"+obj.id+""),
                currentChartTab = d3.select('#chartTypes .'+obj.currentChart),
                svgBlock = d3.selectAll("#charts svg")
            ;

            d3.select('body #disabledScr').style({'display':'none'});
            d3.selectAll('#chartTypes a').classed("active",false);

            currentChartTab.classed("active",true);

            if(!d3.select("#charts .vertical")[0][0]){
                var
/*                    guides = chartBlock
                        .append("div").attr('class','guides'),*/
                    vertical = chartBlock
                        .append("div")
                        .attr("class", "vertical")
                        .style({"opacity":"0","height": chartBlock[0][0].offsetHeight+'px'})
                    ,

                    horizontal = chartBlock.append("div")
                        .attr("class", "horizontal")
                        .style({"opacity":"0","width": chartBlock[0][0].offsetWidth+"px"})
                    ;

                chartBlock
                    .on("mousemove", function(){
                        var mousex = d3.mouse(this);
                        vertical.style("left", mousex[0] +6 + "px" );
                        horizontal.style("top", mousex[1] + 6 + "px" );
                    });


                svgBlock.on("mouseover",function(){

                    d3.select("#charts .vertical").transition()
                        .duration(250)
                        .style('opacity', 1);

                    d3.select("#charts .horizontal").transition()
                        .duration(250)
                        .style('opacity', 1);

                });

                svgBlock.on("mouseout",function(){

                    d3.select("#charts .vertical").transition()
                        .duration(250)
                        .style('opacity',0);

                    d3.select("#charts .horizontal").transition()
                        .duration(250)
                        .style('opacity', 0);

                });
            }

        },

        load_n_ProcessData : function( obj ){
            //debugger;
            var
                jsonPath = obj.jsonPath,
                sortKey = obj.sortKey,
                commonService = obj.commonService,
                sortOrder = obj.sortOrder,
                limit = obj.limit,
                viewScope = obj.viewScope
            ;


            commonService.showLoading();

            d3.json(jsonPath, function(error, data) {

                if (error) {
                    commonService.hideLoading();
                    var appViewMsg = {
                        type:"error",
                        message:"Some Server error occured, Please try after sometime."
                    };
                    viewScope.$emit('appViewMessage',appViewMsg);
                    return console.error(error);
                }

                if(!!data && data.length == 0){
                    commonService.hideLoading();
                    var appViewMsg = {
                        type:"error",
                        message:"No Data found for this report."
                    };
                    viewScope.$emit('appViewMessage',appViewMsg);
                    return {data:data};
                }

                var columnsWhichHaveData="";

                data.forEach(function (d) {
                    for(var i in d){
                        if(d[i] == null && columnsWhichHaveData.indexOf(i)==-1){
                            delete d[i];
                        } else if(!isNaN(d[i])) {
                            d[i] = +d[i];
                            columnsWhichHaveData = i+","
                        }else{
                            columnsWhichHaveData = i+","
                        }
                    }
                });



                //debugger;
                if (!isNaN(+data[0][sortKey])){
                    data.forEach(function (d) {
                        d[sortKey] = +d[sortKey];
                    });

                }

                var sortedData = data.sort(function (a, b) {
                    if (a[sortKey] > b[sortKey]) {
                        return 1;
                    }
                    if (a[sortKey] < b[sortKey]) {
                        return -1;
                    }
                    // a must be equal to b
                    return 0;
                });

                if(sortOrder==='reverse'){
                    sortedData = sortedData.reverse();
                }

                sortedData = sortedData.slice(0,limit);

                var dataObj = {data:sortedData};

                obj.callback(dataObj);

                return dataObj;
            });
    },
    improveData:function(obj){

        var
            data = obj.data,
            axisXkey = obj.axisXkey,
            axisYkey = obj.axisYkey,
            nestKey = obj.nestKey,
            division = obj.division
            ;

        data.forEach(function(d) {

            d[axisXkey] = new Date(d[axisXkey]);
            d[axisYkey] = parseInt(d[axisYkey])/division;

        });

        //All axis  initialization />
        var stack = d3.layout.stack()
                .offset("zero")
                .values(function(d) { return d.values; })
                .x(function(d) { return d[axisXkey]; })
                .y(function(d) { return d[axisYkey]; })
            ;

        var nest = d3.nest()
                .key(function(d) { return d[nestKey]; })
                .sortKeys(d3.descending)
            ;

        var layers = stack(nest.entries(data));

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

            d.totalaxisYkey = Math.round(totalaxisYkey * division);
            d.name = obj.axisYkey;
            d.channel = channel;
            d.dateRange = dateRange;

            processedData.push(d);
        });

        var processedData = processedData.sort(function (a, b) {
            if (a.totalaxisYkey > b.totalaxisYkey) {
                return 1;
            }
            if (a.totalaxisYkey < b.totalaxisYkey) {
                return -1;
            }
            // a must be equal to b
            return 0;
        });

        return processedData;
    }
    ,
    updateChart :function(scop){
        return function(chartType){
            if(!chartType)
                chartType=scop.currentChart;
            console.log('commonService update chart called');
            scop.loadChart(chartType );
        }
    },

    getTabularColumns : function(){
        return this.tabularColumns;
    },
    setTabularColumns : function(obj){
        this.tabularColumns = obj;
    },
    addToolTip : function(chartPlaceHolder){
        //debugger;
        var tooltip =d3.select( '#chartToolTip');
        if(!tooltip){
        tooltip = chartPlaceHolder
            .append("div")
            .attr({'id':'chartTooltip'})
        ;
            return tooltip;
        }

        return tooltip;

    },
    requestCampaignIds:function(){
        console.log('request campaign id called.');
        var
            dates = this.dates,
            startDate = dates.startDate,
            endDate = dates.endDate,
            dateString = startDate.getFullYear()+"-"+(startDate.getMonth()+1)+"-"+startDate.getDate()+","+
            endDate.getFullYear()+"-"+(endDate.getMonth()+1)+"-"+endDate.getDate(),
            url=campainIdsUrl+dateString
        ;
        //url = "static/dummyData/campaignIds.json";

        return $http({
            method: 'GET',
            url: url
        });
    },
    setDates:function (dates) {
        this.dates = dates;
    },
    getDates:function (dates) {
        return dates;
    }


    };
    return self;
}]);
