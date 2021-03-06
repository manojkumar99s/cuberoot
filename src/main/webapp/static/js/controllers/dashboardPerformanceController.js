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

        //debugger;
        if(!$scope.campaign_id){
            $scope.campaign_id = "all";
        }

        var
            startDate = $scope.startDate,
            endDate = $scope.endDate,
            dateString = startDate.getFullYear()+"-"+(startDate.getMonth()+1)+"-"+startDate.getDate()+","+
            endDate.getFullYear()+"-"+(endDate.getMonth()+1)+"-"+endDate.getDate(),
            reportsUrl = ""
        ;

        if($scope.campaign_id === "all"){
            reportsUrl = "/b9/report/";
            dateString +="/";
        }else{
            reportsUrl = "/b7/report/";
            dateString +="/"+$scope.campaign_id;
        }
        //reportsUrl =  "/b1/report/";


        $scope.currentChart = chartType;

        var load_n_ProcessData = commonService.load_n_ProcessData;
        var improveData = commonService.improveData;
        var addInteractivity = commonService.addInteractivity;
        var doTheRest = commonService.doTheRest;

        switch (chartType){
            case 'impressions':

                var url = reportsUrl+"1/"+dateString;

                load_n_ProcessData({
                    jsonPath : url,
                    sortKey: "date",
                    commonService:commonService,
                    viewScope:$scope,
                    callback:function(dataObj){

                        var
                            axisYkey = "impressions",
                            highestYKey = d3.max(dataObj.data, function(d) { return d[axisYkey]; }),
                            scaleDetails
                        ;

                        $scope.scaleDetails = scaleDetails = commonService.getDiv_n_Scale(highestYKey);
                        streamGraphChart({
                            targetID: 'performanceChart',
                            dataObj: {data: dataObj.data, improveData: improveData},
                            axis: {
                                axisXkey: "date",
                                axisYkey: axisYkey,
                                'x': true,
                                'y': true,
                                'xLabel': '',
                                'yLabel': 'Impressions',
                                scaleDetails: $scope.scaleDetails
                            },
                            margin:{top:10,right:10,bottom:45,left:80},
                            dimensions: {width: '75%', height: '45%'},
                            nestKey:"channel"
                        });

                        d3.select('#eCPMChart').style({'display':'block'});


                        var
                            axisYkey2 = "cpm",
                            highestYKey2 = d3.max(dataObj.data, function(d) { return d[axisYkey2]; }),
                            scaleDetails2
                            ;
                        $scope.scaleDetails2 = scaleDetails2 = commonService.getDiv_n_Scale(highestYKey2);

                        streamGraphChart({
                            targetID: 'eCPMChart',
                            dataObj: {data: dataObj.data, improveData: improveData},
                            axis: {
                                axisXkey: "date",
                                axisYkey: "cpm",
                                'x': true,
                                'y': true,
                                'xLabel': '',
                                'yLabel': 'eCPM',
                                scaleDetails: $scope.scaleDetails2
                            },
                            margin:{top:10,right:10,bottom:45,left:80},
                            dimensions: {width: '75%', height: '35%'},
                           nestKey:"channel"
                        });

                        var cpmScale = (!!scaleDetails2.numberScale) ? '('+scaleDetails2.numberScale+')' : '';
                        var impScale = (!!scaleDetails.numberScale) ? '('+scaleDetails.numberScale+')' : '';
                        $scope.columnDefs = [
                            { field: 'date', displayName: 'Date', cellFilter: $scope.dateFormat, enableFiltering : false},
                            { field: 'channel', displayName: 'Channel' , enableFiltering : true},
                            { field: 'impressions', displayName: 'Impressions '+impScale/*, cellTemplate:'<div class="ui-grid-cell-contents">{{row.entity.impressions}}</div>'*/, enableFiltering : false},
                            { field: 'cpm', displayName: 'CPM '+cpmScale/*, cellTemplate:'<div class="ui-grid-cell-contents">{{row.entity.cpm }}</div>'*/ , enableFiltering : false},
                            { field: 'cost', displayName: 'Cost' , enableFiltering : false}
                        ];

                        $scope.tabularData = dataObj.data;
                        $scope.$apply();


                        commonService.addInteractivity({"id":"charts", currentChart : $scope.currentChart});
                        /*doTheRest({tabularData:dataObj.data, currentChart:$scope.currentChart, commonService:commonService, viewScope:$scope});*/
                    }
                });

            break;

            case 'clicks':


                var url = reportsUrl+"2/"+dateString;
                load_n_ProcessData({

                    jsonPath : url,
                    sortKey: "date",
                    highestYKey:'clicks',
                    commonService:commonService,
                    viewScope:$scope,

                    callback:function(dataObj){

                        var
                            axisYkey = "clicks",
                            highestYKey = d3.max(dataObj.data, function(d) { return d[axisYkey]; }),
                            scaleDetails
                        ;

                        $scope.scaleDetails = scaleDetails = commonService.getDiv_n_Scale(highestYKey);

                        streamGraphChart({
                            targetID: 'performanceChart',
                            dataObj: {data: dataObj.data, improveData: improveData},
                            axis: {
                                axisXkey: "date",
                                axisYkey: axisYkey,
                                'x': true,
                                'y': true,
                                'xLabel': '',
                                'yLabel': 'Clicks',
                                scaleDetails: scaleDetails
                            },
                            margin:{top:10,right:10,bottom:45,left:80},
                             dimensions: {width: '75%', height: '45%'},
                           nestKey:"channel"
                        });

                        d3.select('#eCPMChart').style({'display':'block'});

                        streamGraphChart({
                            targetID: 'eCPMChart',
                            dataObj: {data: dataObj.data, improveData: improveData},
                            axis: {
                                axisXkey: "date",
                                axisYkey: axisYkey,
                                'x': true,
                                'y': true,
                                'xLabel': '',
                                'yLabel': 'Cost per click'/*,
                                scaleDetails: scaleDetails*/
                            },
                            margin:{top:10,right:10,bottom:45,left:80},
                            dimensions: {width: '75%', height: '35%'},
                           nestKey:"channel"
                        });

                        var clickScale = (!!scaleDetails.numberScale) ? '('+scaleDetails.numberScale+')' : '';
                        $scope.columnDefs = [
                            { field: 'date', displayName: 'Date', cellFilter: $scope.dateFormat , enableFiltering : false},
                            { field: 'channel', displayName: 'Channel' , enableFiltering : true},
                            { field: 'clicks', displayName: 'Clicks'+clickScale, /*cellTemplate:'<div class="ui-grid-cell-contents">{{row.entity.clicks * grid.appScope.scaleDetails.division}}</div>',*/ enableFiltering : false},
                            { field: 'cost', displayName: 'Cost' , enableFiltering : false},
                            { field: 'cpc', displayName: 'Cost per click' , enableFiltering : false}
                        ];

                        $scope.tabularData = dataObj.data;
                        $scope.$apply();

                        /*doTheRest({tabularData:dataObj.data, currentChart:$scope.currentChart, commonService:commonService, viewScope:$scope});*/
                        addInteractivity({"id":"charts", currentChart : $scope.currentChart});

                    }
                });

                break;

            case 'conversions':

                var url = reportsUrl+"3/"+dateString;
                load_n_ProcessData({
                    jsonPath : url,
                    sortKey: "date",
                    highestYKey:'impressions',
                    viewScope:$scope,
                    commonService:commonService,
                    callback:function(dataObj){

                        var
                            axisYkey = "conversions",
                            highestYKey = d3.max(dataObj.data, function(d) { return d[axisYkey]; }),
                            scaleDetails
                        ;

                        $scope.scaleDetails = scaleDetails = commonService.getDiv_n_Scale(highestYKey);

                        streamGraphChart({
                            targetID: 'performanceChart',
                            dataObj: {data: dataObj.data, improveData: improveData},
                            axis: {
                                axisXkey: "date",
                                axisYkey: axisYkey,
                                'x': true,
                                'y': true,
                                'xLabel': '',
                                'yLabel': 'Conversions',
                                scaleDetails: scaleDetails
                            },
                            margin:{top:10,right:10,bottom:45,left:80},
                             dimensions: {width: '75%', height: '45%'},
                           nestKey:"channel"
                        });


                        d3.select('#eCPMChart').style({'display':'block'});

                        streamGraphChart({
                            targetID: 'eCPMChart',
                            dataObj: {data: dataObj.data, improveData: improveData},
                            axis: {
                                axisXkey: "date",
                                axisYkey: axisYkey,
                                'x': true,
                                'y': true,
                                'xLabel': '',
                                'yLabel': 'Cost per conversion',
                                scaleDetails: scaleDetails
                            },
                            margin:{top:10,right:10,bottom:45,left:80},
                            dimensions: {width: '75%', height: '35%'},
                           nestKey:"channel"
                        });

                        var conversionScale = (!!scaleDetails.numberScale) ? '('+scaleDetails.numberScale+')' : '';
                        $scope.columnDefs = [
                            { field: 'date', displayName: 'Date', cellFilter: $scope.dateFormat , enableFiltering : false},
                            { field: 'channel', displayName: 'Channel' , enableFiltering : true},
                            { field: 'conversions', displayName: 'Conversions'+conversionScale/*, cellTemplate:'<div class="ui-grid-cell-contents">{{ row.entity.conversions }}</div>'*/, enableFiltering : false},
                            { field: 'cost', displayName: 'Cost' , enableFiltering : false},
                            { field: 'cpconversion', displayName: 'Cost per conversion' , enableFiltering : false}
                        ]
                        $scope.tabularData =  dataObj.data;

                        /*doTheRest({tabularData:dataObj.data, currentChart:$scope.currentChart, commonService:commonService, viewScope:$scope});*/
                        addInteractivity({"id":"charts", currentChart : $scope.currentChart});

                        $scope.$apply();
                    }
                });

            break;

            case 'cost':

                var url = reportsUrl+"4/"+dateString;
                load_n_ProcessData({
                    jsonPath : url,
                    sortKey: "date",
                    viewScope:$scope,
                    commonService:commonService,
                    callback:function(dataObj){

                        var
                            axisYkey = "cost",
                            highestYKey = d3.max(dataObj.data, function(d) { return d[axisYkey]; }),
                            scaleDetails = commonService.getDiv_n_Scale(highestYKey)
                        ;

                        streamGraphChart({
                            targetID: 'performanceChart',
                            dataObj: {data: dataObj.data, improveData: improveData},
                            axis: {
                                axisXkey: "date",
                                axisYkey: axisYkey,
                                'x': true,
                                'y': true,
                                'xLabel': '',
                                'yLabel': 'Cost',
                                scaleDetails: scaleDetails
                            },
                            margin:{top:10,right:10,bottom:45,left:80},
                             dimensions: {width: '75%', height: '45%'},
                           nestKey:"channel"
                        });

                        var costScale = (!!scaleDetails.numberScale) ? '('+scaleDetails.numberScale+')' : '';
                        $scope.columnDefs = [
                            { field: 'date', displayName: 'Date', cellFilter: $scope.dateFormat, enableFiltering : false},
                            { field: 'channel', displayName: 'Channel', enableFiltering : true },
                            { field: 'cost', displayName: 'Cost '+costScale, enableFiltering : false }
                        ]
                        $scope.tabularData =  dataObj.data;

                        $scope.$apply();

                        d3.select('#eCPMChart').style({'display':'none'});
                        addInteractivity({"id":"charts", currentChart : $scope.currentChart});
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