'use strict';

var cubeRootApp =  angular.module('CubeRootApp');
cubeRootApp.controller('loginCtrl', ['$scope',  '$uibModal', '$log', '$http', function ($scope,  $uibModal, $log, $http) {

	$scope.submitLogin = function(){
		$http({
			  method: 'POST',
			  data:{username:$scope.user.username, password:$scope.user.password},
			  headers: {
				   'Content-Type': 'application/json'
			  },
			  url: 'Api/UserLogin'
			}).then(function successCallback(response) {
			    console.log('user logged in.....')
			  }, function errorCallback(response) {
				  console.log('user not logged in...')
			  });		
	};
	
/*	$scope.validateLoginForm = function(){
		
		if(email == '' || !vaidateEmail(user.email)){
			
		}
		
	}
	
	$scope.validateEmail =  function(email) {
	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email);
	}*/
	
	
	
	
	

    $scope.items = ['item1', 'item2', 'item3'];

    $scope.forgotPassword = function (size) {

        var modalInstance = $uibModal.open({
            templateUrl: 'forgotPassword',
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
}]);

cubeRootApp.controller('modalViewInstanceCtrl', ['$scope', '$uibModalStack', 'items', function ($scope, $uibModalStack, items) {

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
}]);