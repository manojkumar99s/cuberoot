"use strict";
angular.module('CubeRootApp')
    .controller("appViewCtrl",["$scope","$state","$rootScope",'$uibModal', '$log', '$http',"commonService",function($scope, $state,$rootScope, $uibModal, $log, $http, commonService){
        $scope.$state = $state;

        $scope.commonService = commonService;

        $rootScope.$on('datesLoaded',function (event) {
            event.stopPropagation();
            $scope.loadCampaignIds();
        });
        $rootScope.$on('startDateChanged',function (event) {
            event.stopPropagation();
            $scope.updateCampaignIds();
        });
        $rootScope.$on('endDateChanged',function (event) {
            event.stopPropagation();
            $scope.updateCampaignIds();
        });

        $scope.updateCampaignIds = function(){
            commonService.requestCampaignIds()
                .then(function successCallback(response) {
                    $scope.campaignIds = response.data;
                    //$scope.$broadcast('campaignIdsAvailable');
                }, function errorCallback(response) {
                    console.log(response);
                    alert('Error fetching campaign IDs /n make sure your session is valid.');
                });

        };

        $scope.loadCampaignIds = function(){
            commonService.showLoading();
            commonService.requestCampaignIds()
                .then(function successCallback(response) {
                    $scope.campaignIds = response.data;
                    $scope.$broadcast('campaignIdsAvailable');
                }, function errorCallback(response) {
                    console.log(response);
                    alert('Error fetching campaign IDs /n make sure your session is valid.');
                });

        };

        $rootScope.$on('appViewMessage',function (event,data) {
            $rootScope.appViewMsg = data;
            event.stopPropagation();
            $scope.showAppMsg(500);
        });

        $scope.showAppMsg = function (size) {

            var modalInstance = $uibModal.open({
                templateUrl: 'applicationMessage',
                controller: 'applicationMessageCtrl',
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });
        };

}])
    .controller('applicationMessageCtrl', ['$scope','$rootScope' , '$uibModalStack', 'items', '$validation', 'commonService',
        function ($scope, $rootScope, $uibModalStack, items, $validation, commonService) {

            $scope.ok = function () {
                $uibModalStack.dismiss('ok');
            };

            $scope.cancel = function () {
                $uibModalStack.dismiss('cancel');
            };
        }]);;