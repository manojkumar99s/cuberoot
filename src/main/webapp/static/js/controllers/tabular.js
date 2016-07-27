"use strict";

var cubeRootApp =  angular.module('CubeRootApp');

/*cubeRootApp.filter('visibleColumns', function() {
    return function(data, grid, query) {

        var matches = [];

        //no filter defined so bail
        if (query === undefined|| query==='') {
            return data;
        }

        query = query.toLowerCase();

        //loop through data items and visible fields searching for match
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < grid.columnDefs.length; j++) {

                var dataItem = data[i];
                var fieldName = grid.columnDefs[j]['field'];

                //as soon as search term is found, add to match and move to next dataItem
                if (!!dataItem[fieldName] && dataItem[fieldName].toString().toLowerCase().indexOf(query)>-1) {
                    matches.push(dataItem);
                    break;
                }
            }
        }
        return matches;
    }
});*/

cubeRootApp.controller('tabularCtrl', ['$scope', '$http', '$filter','uiGridConstants','commonService',
    function ($scope, $http, $filter, uiGridConstants,commonService) {

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

    var columnListener = $scope.$watch('columnDefs',function() {
        var enableFiltering = $scope.$parent.enableColumnFiltering;
        $scope.gridOptions.enableFiltering =  (enableFiltering === undefined) ? true : enableFiltering ;
        //if($scope.gridOptions.columnDefs !== $scope.$parent.columnDefs)
        {
            $scope.Data = $scope.$parent.tabularData;
            $scope.gridOptions.columnDefs = $scope.$parent.columnDefs;
            $scope.gridOptions.data = $scope.Data;
            console.log('columnDefs got changed.');
            //columnListener();
        };
    });


}]);
