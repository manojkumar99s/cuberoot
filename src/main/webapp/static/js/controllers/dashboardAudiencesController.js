"use strict";
var cubeRootApp =  angular.module('CubeRootApp');
cubeRootApp.controller("dashboardAudiencesCtrl",["$scope","commonService",function($scope,commonService){

    $scope.currentChart = "demographic";

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

                        $scope.tabularData = dataObj.data;
                        $scope.$apply();

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
                            dimensions: {width: '75%', height: '40%'},
                            nestKey:"channel"
                        });


                        axisYkey = "cpp";
                        highestYKey = d3.max(dataObj.data, function(d) { return d[axisYkey]; });
                        scaleDetails = commonService.getDiv_n_Scale(highestYKey);

                        streamGraphChart({
                            targetID: 'chart2',
                            dataObj: {data: dataObj.data, improveData: improveData},
                            axis: {
                                axisXkey: "date",
                                axisYkey: axisYkey,
                                'x': false,
                                'y': true,
                                'xLabel': '',
                                'yLabel': 'Cost per 1000 people',
                                scaleDetails: scaleDetails
                            },
                            margin:{top:10,right:10,bottom:45,left:80},
                            dimensions: {width: '75%', height: '25%'},
                            nestKey:"channel"
                        });

                        addInteractivity({"id":"charts", currentChart : $scope.currentChart});

                    }
                });

                break;

            case 'interest':
//                debugger;

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

                        $scope.tabularData = dataObj.data;
                        $scope.$apply();

                    barChart({
                            targetID:"chart1",
                            data:dataObj.data,
                            commonService:commonService,
                            dimension:{"width":"100%","height":"70%"},
                            axis:{'x':true,'y':true,'xLabel':'Segments','yLabel':'Impressions',axisXkey:'audience_segment', axisYkey:'impressions'},
                            margin:{top:40,right:10,bottom:40,left:100}
                        });

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
                geoChart({});
                addInteractivity({"id":"charts",'currentChart':$scope.currentChart});
            break;

            case 'demographic':
//debugger;
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
//debugger;
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