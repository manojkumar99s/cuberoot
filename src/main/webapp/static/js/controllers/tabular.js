"use strict";

var cubeRootApp =  angular.module('CubeRootApp');
cubeRootApp.controller('tabularCtrl', ['$scope', '$http', 'uiGridConstants','commonService',
    function ($scope, $http, uiGridConstants,commonService) {

        $scope.columns = [];

        $scope.gridOptions = {
            enableSorting: true,
            columnDefs: $scope.columns,
            onRegisterApi: function(gridApi) {
                $scope.gridApi = gridApi;
            }
        };

        /*$http.get('static/dummyData/tabulardata.json')
        .success(function(data) {
            $scope.gridOptions.data = data;
        });*/
    /*    $scope.gridOptions.data = $scope.$parent.tabularData;*/


            //console.log($scope.$parent.tabularData);
            /*$scope.gridOptions.data = $scope.$parent.tabularData*/

    $scope.$watch('tabularData',function() {
        $scope.columns = $scope.$parent.tabularColumns;

/*        var tableData = $scope.$parent.tabularData;

        tableData.forEach(function(k){
            debugger;
            for(i in k) {
                if (k[i] === null) {
                    delete k[i];
                }
            }
        });
debugger;*/
        
        $scope.gridOptions.data = $scope.$parent.tabularData;

        /*$scope.$apply();*/
    },true);


}]);
