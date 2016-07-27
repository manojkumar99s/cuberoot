"use strict";
var cubeRootApp =  angular.module('CubeRootApp');
cubeRootApp.controller("dashboardAudiencesCtrl",["$scope","commonService",function($scope,commonService){

    $scope.currentChart = "interest";

    /*$rootScope.tabularData = [];*/
    $scope.updateChart = commonService.updateChart($scope);

    $scope.loadChart = function(chartType){
    /*try {*/
        var
            startDate = $scope.startDate,
            endDate = $scope.endDate,
            dateString = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate() + "," +
                endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate(),
            reportsUrl = "/b1/report/"
        ;

        if(!$scope.campaign_id){
            $scope.campaign_id = "all";
        }
        dateString +="/"+$scope.campaign_id;

    /*}catch(e){}*/

        $scope.currentChart = chartType;
        var load_n_ProcessData = commonService.load_n_ProcessData;
        var improveData = commonService.improveData;
        var addInteractivity = commonService.addInteractivity;

        function clearForNewGraph() {
            var chartsId = angular.element("#charts");
            chartsId.attr('class','');
            chartsId.addClass('charts reports');
            d3.select('#chart1').html("");
            d3.select('#chart2').html("");
        };

        if($scope.currentChart != "subPieChart"){
            clearForNewGraph();
        }


        switch (chartType){

            case 'reach':

                if($scope.campaign_id === "all"){
                    reportsUrl = "/b9/report/";
                    dateString = dateString.replace('all','')

                } /*else if(dateString.indexOf($scope.campaign_id) === -1) {
             reportsUrl = "/b7/report/";
             dateString +="/"+$scope.campaign_id;
             }*/

                var url = reportsUrl+"17/"+dateString;

                /*                dateString = dateString.replace($scope.campaign_id,"");*/


                load_n_ProcessData({
                    jsonPath : url,
                    sortKey: "date",
                    highestYKey:'impressions',
                    viewScope:$scope,
                    commonService:commonService,
                    callback:function(dataObj){

                        var
                            axisYkey = "reach",
                            highestYKey = d3.max(dataObj.data, function(d) { return d[axisYkey]; }),
                            scaleDetails = commonService.getDiv_n_Scale(highestYKey)
                        ;

                        clearForNewGraph();
                        angular.element("#charts").addClass('reach');

                        streamGraphChart({
                            targetID: 'chart1',
                            dataObj: {data: dataObj.data, improveData: improveData},
                            axis: {
                                axisXkey: "date",
                                axisYkey: axisYkey,
                                'x': true,
                                'y': true,
                                'xLabel': '',
                                'yLabel': 'User Reached',
                                scaleDetails: scaleDetails
                            },
                            margin:{top:10,right:10,bottom:45,left:80},
                            dimensions: {width: '75%', height: '45%'},
                            nestKey:"channel"
                        });

                        var
                            axisYkey2 = "cpconversion",
                            highestYKey2 = d3.max(dataObj.data, function(d) { return d[axisYkey2]; }),
                            scaleDetails2 = commonService.getDiv_n_Scale(highestYKey2)
                        ;

                        streamGraphChart({
                            targetID: 'chart2',
                            dataObj: {data: dataObj.data, improveData: improveData},
                            axis: {
                                axisXkey: "date",
                                axisYkey: axisYkey,
                                'x': true,
                                'y': true,
                                'xLabel': '',
                                'yLabel': 'Cost per 1000 people',
                                scaleDetails: scaleDetails2
                            },
                            margin:{top:10,right:10,bottom:45,left:80},
                            dimensions: {width: '75%', height: '35%'},
                            nestKey:"channel"
                        });


                        var reachScale = (!!scaleDetails.numberScale) ? '('+scaleDetails.numberScale+')' : '';
                        var cpcScale = (!!scaleDetails2.numberScale) ? '('+scaleDetails2.numberScale+')' : '';

                        $scope.columnDefs = [
                            { field: 'date', displayName: 'Date', cellFilter: $scope.dateFormat, enableFiltering : false},
                            { field: 'channel', displayName: 'Channel' , enableFiltering : true},
                            { field: 'reach', displayName: 'Reach '+reachScale/*, cellTemplate:'<div class="ui-grid-cell-contents">{{row.entity.impressions}}</div>'*/, enableFiltering : false},
                            { field: 'cpconversion', displayName: 'CPC '+cpcScale/*, cellTemplate:'<div class="ui-grid-cell-contents">{{row.entity.cpm }}</div>'*/ , enableFiltering : false},
                            { field: 'cost', displayName: 'Cost' , enableFiltering : false}
                        ];

                        $scope.tabularData = dataObj.data;
                        $scope.$apply();

                        addInteractivity({"id":"charts",'currentChart':$scope.currentChart});
                    }
                });

                break;

            case 'interest':

            var url = reportsUrl+'5/'+dateString;
                //url="static/dummyData/barChartData.json";
                load_n_ProcessData({
                    jsonPath : url,
                    sortKey: "impressions",
                    sortOrder:'reverse',
                    viewScope:$scope,
                    limit:10,
                    commonService:commonService,
                    dateRange:dateString,
                    callback:function(dataObj){

                    barChart({
                            targetID:"chart1",
                            data:dataObj.data,
                            commonService:commonService,
                            dimension:{"width":"100%","height":"70%"},
                            axis:{'x':true,'y':true,'xLabel':'Segments','yLabel':'Impressions',axisXkey:'audience_segment', axisYkey:'impressions'},
                            margin:{top:40,right:10,bottom:40,left:100}
                        });

                        $scope.enableColumnFiltering = false; 
                        $scope.columnDefs = [
                            { field: 'audience_segment', displayName: 'Segment' },
                            { field: 'impressions', displayName: 'Impressions' }
                        ];
                        $scope.tabularData = dataObj.data;
                        $scope.$apply();

                        addInteractivity({"id":"charts",'currentChart':$scope.currentChart});

                    }
                });

            break;

            case 'devices':
                var url = reportsUrl+'7/'+dateString;
                //url="static/dummyData/barChartData.json";
                load_n_ProcessData({
                    jsonPath : url,
                    sortKey: "impressions",
                    sortOrder:'reverse',
                    viewScope:$scope,
                    commonService:commonService,
                    limit:10,
                    dateRange:dateString,
                    callback:function(dataObj){
                        $scope.columnDefs = [
                            { field: 'device_type', displayName: 'Device' },
                            { field: 'impressions', displayName: 'Impressions' }
                        ];
                        $scope.tabularData = dataObj.data;
                        $scope.$apply();
                        clearForNewGraph();

                        barChart({
                            targetID:"chart1",
                            data:dataObj.data,
                            commonService:commonService,
                            dimension:{"width":"100%","height":"70%"},
                            axis:{'x':true,'y':true,'xLabel':'Segments','yLabel':'Impressions',axisXkey:'device_type', axisYkey:'impressions'},
                            margin:{top:40,right:10,bottom:40,left:100}
                        });

                        addInteractivity({"id":"charts",'currentChart':$scope.currentChart});


                    }
                });



            break;

            case 'os':

                var url = reportsUrl+'8/'+dateString;
                //url="static/dummyData/barChartData.json";
                load_n_ProcessData({
                    jsonPath : url,
                    sortKey: "impressions",
                    sortOrder:'reverse',
                    viewScope:$scope,
                    limit:10,
                    commonService:commonService,
                    dateRange:dateString,
                    callback:function(dataObj){

                        $scope.columnDefs = [
                            { field: 'os', displayName: 'Operating System' },
                            { field: 'impressions', displayName: 'Impressions' }
                        ];
                        $scope.tabularData = dataObj.data;
                            $scope.$apply();
                        clearForNewGraph();

                        barChart({
                            targetID:"chart1",
                            data:dataObj.data,
                            commonService:commonService,
                            dimension:{"width":"100%","height":"70%"},
                            axis:{'x':true,'y':true,'xLabel':'Segments','yLabel':'Impressions',axisXkey:'os', axisYkey:'impressions'},
                            margin:{top:40,right:10,bottom:40,left:100}
                        });

                        addInteractivity({"id":"charts",'currentChart':$scope.currentChart});

 
                    }
                });

                break;

            case 'geographic':
                var chartsId = angular.element("#charts");
                chartsId.addClass('geographic');

                var url = reportsUrl+'6/'+dateString;
                //var topoJsonFile = "static/dummyData/world-110m2.json";
                var topoJsonFile = "static/dummyData/world-50m.json";

                load_n_ProcessData({
                    jsonPath : topoJsonFile,
                    viewScope:$scope,
                    skipProcessing: true,
                    commonService:commonService,
                    callback:function(topoJsonData) {

                        load_n_ProcessData({
                            jsonPath: url,
                            viewScope: $scope,
                            skipProcessing: true,
                            commonService: commonService,
                            callback: function (dataObj) {

                                dataObj.data.forEach(function(d){
                                    var cityDetails = d.city.split(",");
                                    d.city = cityDetails[0];
                                    d.lat = cityDetails[2];
                                    d.long = cityDetails[1];
                                });


                                $scope.columnDefs = [
                                    { field: 'city', displayName: 'City' },
                                    { field: 'impressions', displayName: 'Impressions' },
                                    { field: 'reach', displayName :'Reach' }/*,
                                    { field : 'lat', displayName : 'Lat'},
                                    { field : 'long', displayName : 'Long'}*/
                                ];
                                $scope.tabularData = dataObj.data;

                                $scope.$apply();

                                geoChart({
                                    targetID: "chart1",
                                    topoJsonData: topoJsonData.data,
                                    data: dataObj.data,
                                    commonService: commonService,
                                    dimension: {"width": "100%", "height": "40%"},
                                    axis: {
                                        'x': true,
                                        'y': true,
                                        'xLabel': 'City',
                                        'yLabel': 'Impressions',
                                        axisXkey: 'city',
                                        axisYkey: 'impressions'
                                    }
                                    
                                });
                                addInteractivity({"id": "charts", 'currentChart': $scope.currentChart,showGrid:false});
                            }
                        });
                    }
                });
            break;

            case 'demographic':
                var chartsId = angular.element("#charts");
                chartsId.addClass('demographic');

                var url = reportsUrl+'19/'+dateString;
                load_n_ProcessData({
                    jsonPath : url,
                    sortKey: "impressions",
                    sortOrder:'reverse',
                    viewScope:$scope,
                    limit:10,
                    commonService:commonService,
                    dateRange:dateString,
                    callback:function(dataObj){

                        $scope.tabularData = dataObj.data;
                        $scope.$apply();

                        barChart({
                            targetID:"chart1",
                            data:dataObj.data,
                            commonService:commonService,
                            dimension:{"width":"100%","height":"70%"},
                            axis:{'x':true,'y':true,'xLabel':'Gender','yLabel':'Impressions',axisXkey:'age', axisYkey:'impressions'},
                            margin:{top:40,right:10,bottom:40,left:70}
                        });

                    }
                });

                var url = reportsUrl+'20/'+dateString;
                load_n_ProcessData({
                    jsonPath : url,
                    sortKey: "impressions",
                    sortOrder:'reverse',
                    viewScope:$scope,
                    limit:10,
                    commonService:commonService,
                    dateRange:dateString,
                    callback:function(dataObj){

                        var targetID = "chart2"
                        $scope.tabularData = dataObj.data;
                        $scope.$apply();

                        barChart({
                            targetID:targetID,
                            data:dataObj.data,
                            commonService:commonService,
                            dimension:{"width":"100%","height":"70%"},
                            axis:{'x':true,'y':true,'xLabel':'Gender','yLabel':'Impressions',axisXkey:'gender', axisYkey:'impressions'},
                            margin:{top:40,right:10,bottom:40,left:70}
                        });

                        addInteractivity({"id":"charts",'currentChart':$scope.currentChart});
                    }
                });
            break;

            case 'subPieChart':

                var url = ""; //pie chart api is still not available, using dummy data to plot
                url="static/dummyData/pieChartData.json";
                d3.select('#chart2').html("");
                load_n_ProcessData({
                    jsonPath : url,
                    commonService:commonService,
                    dateRange:dateString,
                    /*sortKey: "audience_segment",*/
                    callback:function(dataObj){

                        pieChart({
                            targetID:"chart2",
                            data:dataObj.data,
                            dimension:{"width":"100%","height":"100%"},
                            'x':false,'y':false,
                            margin:{top:0,right:0,bottom:0,left:60},
                            viewScope:$scope
                        });


                        $scope.tabularData = dataObj.data;
                        $scope.$apply();
                        $scope.currentChart="interest";

                        addInteractivity({"id":"charts", currentChart : $scope.currentChart});

                    }
                });

            break;

        };
    };

    $scope.$on('campaignIdsAvailable',function () {


            $scope.loadChart($scope.currentChart);
    /*        $scope.loadChart("interestPieChart");*/
            //console.log('dates loaded init audiences controller');
    })


}]);