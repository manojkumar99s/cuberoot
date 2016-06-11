var cubeRootApp =  angular.module('CubeRootApp');
cubeRootApp.controller('loginCtrl', function ($scope,  $uibModal, $log) {

    $scope.items = ['item1', 'item2', 'item3'];

    $scope.forgotPassword = function (size) {

        var modalInstance = $uibModal.open({
            templateUrl: 'myModalContent.html',
            controller: 'modalViewInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
});

cubeRootApp.controller('modalViewInstanceCtrl', function ($scope, $uibModalStack, items) {

    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $uibModalStack.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $uibModalStack.dismiss('cancel');
    };
});