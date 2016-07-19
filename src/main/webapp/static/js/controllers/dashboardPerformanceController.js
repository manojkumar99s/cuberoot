"use strict";
var cubeRootApp =  angular.module('CubeRootApp');
cubeRootApp.controller("dashboardPerformanceCtrl",["$scope","commonService",function($scope,commonService){

    $scope.currentChart = "impressions";
    $scope.updateChart = commonService.updateChart($scope);
    commonService.addToolTip();

    $scope.loadChart = function(chartType){
        /********
         * Usage chart(jsonPath, colorFamily, keyX, keyY, divisionRatio, nestKey)
         * ******/
        //debugger;
        var
            startDate = $scope.startDate,
            endDate = $scope.endDate,
            dateString = startDate.getFullYear()+"-"+(startDate.getMonth()+1)+"-"+startDate.getDate()+","+
            endDate.getFullYear()+"-"+(endDate.getMonth()+1)+"-"+endDate.getDate(),
            reportsUrl = "/b1/report/";

            //dateString="2016-04-08,2016-04-19"
        ;

        //debugger;
        if(!$scope.campaign_id){
            $scope.campaign_id = "all";
        }
        dateString +="/"+$scope.campaign_id;

        $scope.currentChart = chartType;

        var load_n_ProcessData = commonService.load_n_ProcessData;
        var improveData = commonService.improveData;
        var addInteractivity = commonService.addInteractivity;

        switch (chartType){
            case 'impressions':

                var url = reportsUrl+"1/"+dateString;

                load_n_ProcessData({
                    jsonPath : url,
                    sortKey: "date",
                    commonService:commonService,
                    viewScope:$scope,
                    callback:function(dataObj){
                        streamGraphChart({
                            targetID: 'performanceChart',
                            dataObj: {data: dataObj.data, improveData: improveData},
                            axis: {
                                axisXkey: "date",
                                axisYkey: "impressions",
                                'x': true,
                                'y': true,
                                'xLabel': '',
                                'yLabel': 'Impressions',
                                division: 1000000
                            },
                            dimensions: {width: '75%', height: '40%'},
                            nestKey:"campaign_id"
                        });
/*
                        "performanceChart",, "multiple","date", "impressions", 1000000,"campaign_id",
                        {width:'75%',height:'35%'},
                        {'x':true,'y':true,'xLabel':'Dates','yLabel':'Impressions'}
*/

                        d3.select('#eCPMChart').style({'display':'block'});

                        streamGraphChart({
                            targetID: 'eCPMChart',
                            dataObj: {data: dataObj.data, improveData: improveData},
                            axis: {
                                axisXkey: "date",
                                axisYkey: "cpm",
                                'x': false,
                                'y': true,
                                'xLabel': '',
                                'yLabel': 'eCPM',
                                division: 1000000
                            },
                            dimensions: {width: '75%', height: '25%'},
                            nestKey:"campaign_id"
                        });

/*                        chart("eCPMChart",{data:dataObj.data,improveData:improveData}, "multiple","date", "cpp", 10000000,"campaign_id",
                            {width:'75%',height:'20%'},
                            {'x':false,'y':true,'xLabel':'','yLabel':'eCPM'})*/;

                        addInteractivity({"id":"charts"});

                        var localData = dataObj.data;
                        localData.forEach(function(key,val){
                            var date = new Date (key.date);
                            localData.date = key.date.getDay()+"-"+(parseInt(key.date.getMonth())+1)+"-"+key.date.getFullYear();
                        });

                        $scope.tabularData = localData;
                        $scope.$apply();

                    } 
                });

            break;

            case 'clicks':


                var url = reportsUrl+"2/"+dateString;
                load_n_ProcessData({
                    jsonPath : url,
                    sortKey: "date",
                    viewScope:$scope,
                    commonService:commonService,
                    callback:function(dataObj){
                        chart("performanceChart",{data:dataObj.data, improveData:improveData}, "multiple","date", "clicks", 100000,"campaign_id",
                            {width:'75%',height:'35%'},
                            {'x':true,'y':true,'xLabel':'Dates','yLabel':'Clicks'});

                        d3.select('#eCPMChart').style({'display':'block'});
                        chart("eCPMChart",{data:dataObj.data,improveData:improveData}, "multiple","date", "cpc", 10000000,"campaign_id",
                            {width:'75%',height:'20%'},
                            {'x':false,'y':true,'xLabel':'','yLabel':'Cost per click'});

                        addInteractivity({"id":"charts"});

                        var localData = dataObj.data;
                        localData.forEach(function(key,val){
                            var date = new Date (key.date);
                            localData.date = key.date.getDay()+"-"+(parseInt(key.date.getMonth())+1)+"-"+key.date.getFullYear();
                        });

                        $scope.tabularData = localData;
                        $scope.$apply();

                    }
                });

/*                chart("performanceChart","/a9/report/2/"+dateString, "multiple","date", "clicks",10000,"campaign_id",
                    {width:'100%',height:'35%'},
                    {'x':true,'y':true});

                chart("eCPMChart","/a9/report/2/"+dateString, "multiple","date", "cpc", 1000000,"campaign_id",
                    {width:'100%',height:'20%'},
                    {'x':false,'y':true});

                addInteractivity({"id":"charts"});*/


                break;

            case 'conversions':

                var url = reportsUrl+"3/"+dateString;
                load_n_ProcessData({
                    jsonPath : url,
                    sortKey: "date",
                    viewScope:$scope,
                    commonService:commonService,
                    callback:function(dataObj){
                        chart("performanceChart",{data:dataObj.data, improveData:improveData}, "multiple","date", "reach", 1000,"campaign_id",
                            {width:'75%',height:'35%'},
                            {'x':true,'y':true,'xLabel':'Dates','yLabel':'Clicks'});

                        d3.select('#eCPMChart').style({'display':'block'});
                        chart("eCPMChart",{data:dataObj.data,improveData:improveData}, "multiple","date", "cpc", 100000,"campaign_id",
                            {width:'75%',height:'20%'},
                            {'x':false,'y':true,'xLabel':'','yLabel':'Cost per conversion'});


                        addInteractivity({"id":"charts"});

                        var localData = dataObj.data;
                        localData.forEach(function(key,val){
                            var date = new Date (key.date);
                            localData.date = key.date.getDay()+"-"+(parseInt(key.date.getMonth())+1)+"-"+key.date.getFullYear();
                        });

                        $scope.tabularData = localData;
                        $scope.$apply();

                    }
                });

/*                chart("performanceChart","/a9/report/3/"+dateString, "multiple","date", "conversions",10000,"campaign_id",
                    {width:'100%',height:'35%'},
                    {'x':true,'y':true});

                chart("eCPMChart","/a9/report/2/"+dateString, "multiple","date", "cpc", 1000000,"campaign_id",
                    {width:'100%',height:'20%'},
                    {'x':false,'y':true});
                addInteractivity({"id":"charts"});
                */

            break;

            case 'cost':


                var url = reportsUrl+"4/"+dateString;
                load_n_ProcessData({
                    jsonPath : url,
                    sortKey: "date",
                    viewScope:$scope,
                    commonService:commonService,
                    callback:function(dataObj){
                        chart("performanceChart",{data:dataObj.data, improveData:improveData}, "multiple","date", "cost", 1000000000,"campaign_id",
                            {width:'75%',height:'35%'},
                            {'x':true,'y':true,'xLabel':'Dates','yLabel':'Cost'});

                        addInteractivity({"id":"charts"});

                        var localData = dataObj.data;
                        localData.forEach(function(key,val){
                            var date = new Date (key.date);
                            localData.date = key.date.getDay()+"-"+(parseInt(key.date.getMonth())+1)+"-"+key.date.getFullYear();
                        });

                        $scope.tabularData = localData;
                        $scope.$apply();

                        d3.select('#eCPMChart').style({'display':'none'});

                    }

                });
/*                chart("performanceChart","/a9/report/4/"+dateString, "multiple","date", "cost",1000000000,"campaign_id");
                addInteractivity({"id":"charts"});*/
                break;

        }
    };

    $scope.$on('campaignIdsAvailable',function () {
        $scope.loadChart($scope.currentChart);
        //console.log('dates loaded init performance controller');
    })


}])