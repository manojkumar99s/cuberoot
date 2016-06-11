var cubeRootApp =  angular.module('CubeRootApp');
cubeRootApp.controller('tabularCtrl', ['$scope', '$http', 'uiGridConstants', function ($scope, $http, uiGridConstants) {

    $scope.columns = [
        { field: 'id' },
        { field: 'domain' },
        { field: 'pinner.username' },
        { field: 'description' },
        { field:'price_value'},
        { field:'link'},
        { field:'created_at'}
    ];

    $scope.gridOptions = {
        enableSorting: true,
        columnDefs: $scope.columns,
        onRegisterApi: function(gridApi) {
            $scope.gridApi = gridApi;
        }
    };

    $http.get('../../static/dummyData/tabulardata.json')
    .success(function(data) {
        $scope.gridOptions.data = data;
    });

}]);
