"use strict";
var cubeRootApp =  angular.module('CubeRootApp');
cubeRootApp.controller("dashboardIdealTargetCtrl",["$scope","$http","commonService",function($scope, $http, commonService){
        $scope.performanceMetrics = [
            {"key":"ctr","value":"Optimum CTR"},
            {"key":"cpc","value":"Optimum CPC"},
            {"key":"conversionRate","value":"Optimum Conversion Rate"}
        ];
    $scope.metric = "";
    $scope.idealTargetParams = null;

    var $_ = function (o) {
        var obj;
        if(o.indexOf("#") !==-1) {
            o = o.split("#")[1];
            obj = document.getElementById(o);
        }
        else if(o.indexOf(".") !==-1) {
            o = o.split(".")[1];
            obj = document.getElementsByClassName(o);
        }
        else {
            obj = document.getElementsByTagName(o);
        }
        return angular.element(obj);
    };



    $scope.$on('campaignIdsAvailable',function () {

        if(!$scope.campaign_id ){
            $scope.campaign_id = "";
            commonService.hideLoading();

            $_("#performanceMetric").attr('disabled',true);
        }
    });

    $scope.onCampaignSelect = function () {
        $scope.idealTargetParams = null;
      if($scope.campaign_id !=="" && $scope.campaign_id !== undefined){
          $_("#performanceMetric").removeAttr('disabled');
      } else {
          $_("#performanceMetric").attr('disabled',true);
      }
    };


    $scope.loadITP = function(){
        commonService.showLoading();
        var urls = {
            "ctr":"/b5/report/14/390878914",
            "cpc":"/b5/report/15/390878914",
            "conversionRate":"/b5/report/16/6038591740429"
        };
        $scope.idealTargetParams = null;

        var url = urls[$scope.metric];

        function singleObject (data) {
            var singleObj = {};
            for(var i =0,len=data.length; i< len; i++){
                var obj = data[i];
                for(var k in obj){

                    if(obj[k] !== null) {
                        singleObj[k] = singleObj[k] || "";
                        if(singleObj[k].indexOf(obj[k]) ===-1) {
                            singleObj[k] += (!singleObj[k]) ? obj[k] : ", " + obj[k];
                        }
                    }
                }
            }
            return prioritize(singleObj);
        }

        function prioritize(obj){
            for(var k in obj) {
                if (obj[k].indexOf("P1:") !== -1 || obj[k].indexOf("P2:") !== -1) {
                    var
                        p1 = obj[k].split("P1:")[1].split("P2:"),
                        p2 = p1[1]
                        ;
                    p1 = p1[0];

                    p1 = (!!p1) ? p1.replace(/,/g,", ") : p1;
                    p2 = (!!p2) ? p2.replace(/,/g,", ") : p2;

                    obj[k] = {};
                    obj[k].p1 = p1;
                    obj[k].p2 = p2;
                }
            }
            return obj;
        }

        if($scope.metric !=="" || $scope.metric !== undefined) {
            $http({
                'method': 'GET',
                'url': url
            }).then(function (response) {
                var obj = singleObject(response.data);
                $scope.idealTargetParams = obj;
                commonService.hideLoading();

            }, function (response) {

            })
        }
    }

}]);

