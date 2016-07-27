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
        doTheRest : function(obj){

            obj.commonService.addInteractivity({"id":"charts", currentChart : obj.currentChart});
            obj.viewScope.tabularData = obj.tabularData;
            obj.viewScope.$apply();

        },
        addInteractivity: function (obj) {
            var
                chartBlock = d3.select("#" + obj.id + ""),
                currentChartTab = d3.select('#chartTypes .' + obj.currentChart),
                svgBlock = d3.selectAll("#charts svg"),
                showGrid = obj.showGrid
            ;

            d3.select('body #disabledScr').style({'display': 'none'});
            d3.selectAll('#chartTypes a').classed("active", false);

            currentChartTab.classed("active", true);

            if (showGrid != false) {
                if (!d3.select("#charts .vertical")[0][0]) {
                    var
                    /*                    guides = chartBlock
                     .append("div").attr('class','guides'),*/
                        vertical = chartBlock
                            .append("div")
                            .attr("class", "vertical")
                            .style({"opacity": "0", "height": chartBlock[0][0].offsetHeight + 'px'})
                        ,

                        horizontal = chartBlock.append("div")
                            .attr("class", "horizontal")
                            .style({"opacity": "0", "width": chartBlock[0][0].offsetWidth + "px"})
                        ;
                } else {
                    var
                        vertical = d3.select('.vertical'),
                        horizontal = d3.select('.horizontal')
                        ;
                }


                chartBlock
                    .on("mousemove", function () {
                        var mousex = d3.mouse(this);
                        vertical.style("left", mousex[0] + "px");
                        horizontal.style("top", mousex[1] + "px");
                    });

                svgBlock.on("mouseover", function () {

                    d3.select("#charts .vertical").transition()
                        .duration(250)
                        .style('opacity', 1);

                    d3.select("#charts .horizontal").transition()
                        .duration(250)
                        .style('opacity', 1);

                });

                svgBlock.on("mouseout", function () {

                    d3.select("#charts .vertical").transition()
                        .duration(250)
                        .style('opacity', 0);

                    d3.select("#charts .horizontal").transition()
                        .duration(250)
                        .style('opacity', 0);

                });
            }
        },

        getDiv_n_Scale : function(numb){
            var
                num = parseInt(numb).toString().split('.')[0],
                division = '1',
                len = num.length,
                numberScale = ['','Ten','Hundred','Thousand','Thousands','Lakh','Million','Billion','Trillion','Quadrillion','Quintillion','Sextillion','Septillion']
            ;
            if(len > 3){
                for(var i=3; i<len; i++){
                    division +='0';
                }
            }

            return {division:parseInt(division),numberScale:numberScale[len-3]};

        },

        load_n_ProcessData : function( obj ){

            var
                jsonPath = obj.jsonPath,
                sortKey = obj.sortKey,
                commonService = obj.commonService,
                sortOrder = obj.sortOrder,
                limit = obj.limit,
                viewScope = obj.viewScope,
                skipProcessing = obj.skipProcessing

            ;

            commonService.showLoading();

            d3.json(jsonPath, function(error, data) {

                if (error) {
                    commonService.hideLoading();
                    var appViewMsg = {
                        type: "error",
                        message: "Some Server error occured, Please try after sometime."
                    };
                    viewScope.$emit('appViewMessage', appViewMsg);
                    return console.error(error);
                }

                if (!!data && data.length == 0) {
                    commonService.hideLoading();
                    var appViewMsg = {
                        type: "error",
                        message: "No Data found for this report."
                    };
                    viewScope.$emit('appViewMessage', appViewMsg);
                    return {data: data};
                }

            if (!skipProcessing) {
                var columnsWhichHaveData = "";
                data.forEach(function (d) {
                    for (var i in d) {
                        if (d[i] == null && columnsWhichHaveData.indexOf(i) == -1) {
                            delete d[i];
                        } else if (!isNaN(d[i]) && !Array.isArray(d[i]) ) {
                            var str = d[i].toString();
                            if(str.indexOf('.')!==-1){
                                d[i] = parseFloat(d[i]).toFixed(4);
                            }
                            d[i] = +d[i];

                            columnsWhichHaveData = i + ","
                        } else {
                            columnsWhichHaveData = i + ","
                        }
                    }
                });

                if (!isNaN(+data[0][sortKey])) {
                    data.forEach(function (d) {
                        d[sortKey] = +d[sortKey];
                    });

                }

                var
                    sortedData
                ;

                if (!!sortKey) {
                    sortedData = commonService.sortData(data, sortKey);

                    if (sortOrder === 'reverse') {
                        sortedData = sortedData.reverse();
                    }
                } else {
                    sortedData = data
                }

                if (!!limit)
                    sortedData = sortedData.slice(0, limit);


            } else {
                sortedData = data;
            }
                var dataObj = {data:sortedData};

                obj.callback(dataObj);

                //return dataObj;
            });
    },
    sortData:function(data,sortKey){
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
        return sortedData;
    },
    improveData:function(obj){

        var
            processedData = obj.data,
            axisXkey = obj.axisXkey,
            axisYkey = obj.axisYkey,
            nestKey = obj.nestKey,
            division = obj.division

        ;
        processedData.forEach(function(d) {

            d[axisXkey] = new Date(d[axisXkey]);
            if(!!division && division.toString().length > 1)
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

        var layers = stack(nest.entries(processedData));

        var totalaxisYkey=0, dateRange=[], channel="" ;

/*        layers.forEach(function(d){

/!*            d.values.forEach(function(key){
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

            });*!/

            d.totalaxisYkey = Math.round(totalaxisYkey * division);
            d.channel = channel;
            d.dateRange = dateRange;

            processedData.push(d);
        });*/

        processedData = [];
        processedData = layers.sort(function (a, b) {
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
