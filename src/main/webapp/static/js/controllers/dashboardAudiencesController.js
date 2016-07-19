"use strict";
var cubeRootApp =  angular.module('CubeRootApp');
cubeRootApp.controller("dashboardAudiencesCtrl",["$scope","commonService",function($scope,commonService){

    $scope.currentChart = "reach";

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
        angular.element("#charts").removeClass('reach');

        switch (chartType){
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

                    barChart({
                            targetID:"chart1",
                            data:dataObj.data,
                            commonService:commonService,
                            dimension:{"width":"100%","height":"70%"},
                            axis:{'x':true,'y':true,'xLabel':'Segments','yLabel':'Impressions',axisXkey:'audience_segment', axisYkey:'impressions'},
                            margin:{top:40,right:10,bottom:40,left:100}
                        });

                        addInteractivity({"id":"charts",'currentChart':$scope.currentChart});

                        $scope.tabularData = dataObj.data;
                        $scope.$apply();

                        d3.select('#chart2').html("");
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
                        barChart({
                            targetID:"chart1",
                            data:dataObj.data,
                            commonService:commonService,
                            dimension:{"width":"100%","height":"70%"},
                            axis:{'x':true,'y':true,'xLabel':'Segments','yLabel':'Impressions',axisXkey:'device_type', axisYkey:'impressions'},
                            margin:{top:40,right:10,bottom:40,left:100}
                        });

/*                        multilinechart({
                            targetID:"chart1",
                            data:dataObj.data,
                            commonService:commonService,
                            dimension:{"width":"100%","height":"70%"},
                            axis:{'x':true,'y':true,'xLabel':'Segments','yLabel':'Interest',axisXkey:'date',axisYkey:'impressions'},
                            margin:{top:40,right:10,bottom:150,left:60}
                        });*/

                        addInteractivity({"id":"charts",'currentChart':$scope.currentChart});

                        $scope.tabularData = dataObj.data;
                        $scope.$apply();

                        d3.select('#chart2').html("");
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
                        debugger
                        barChart({
                            targetID:"chart1",
                            data:dataObj.data,
                            commonService:commonService,
                            dimension:{"width":"100%","height":"70%"},
                            axis:{'x':true,'y':true,'xLabel':'Segments','yLabel':'Impressions',axisXkey:'os', axisYkey:'impressions'},
                            margin:{top:40,right:10,bottom:40,left:100}
                        });

                        addInteractivity({"id":"charts",'currentChart':$scope.currentChart});

                        $scope.tabularData = dataObj.data;
                        $scope.$apply();

                        d3.select('#chart2').html("");
                    }
                });

                break;

            case 'geographic':

            break;

            case 'demographic':

            break;

            case 'reach':

                angular.element("#charts").addClass('reach');
                var url = reportsUrl+"17/"+dateString;
                
                load_n_ProcessData({
                    jsonPath : url,
                    sortKey: "date",
                    viewScope:$scope,
                    commonService:commonService,
                    callback:function(dataObj){
                        chart("chart1",{data:dataObj.data, improveData:improveData}, "multiple","date", "reach", 1000,"campaign_id",
                            {width:'75%',height:'35%'},
                            {'x':true,'y':true,'xLabel':'Dates','yLabel':'User Reached'});


                        d3.select('#chart2').style({'display':'block'});
                        chart("chart2",{data:dataObj.data,improveData:improveData}, "multiple","date", "cpp", 100000,"campaign_id",
                            {width:'75%',height:'20%'},
                            {'x':false,'y':true,'xLabel':'','yLabel':'Cost per 1000 people'});


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

            case 'interestPieChart':

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