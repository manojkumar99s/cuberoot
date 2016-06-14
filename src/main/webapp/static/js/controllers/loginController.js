'use strict';
var cubeRootApp =  angular.module('CubeRootApp');
cubeRootApp.controller('loginCtrl', ['$validation','$scope',  '$uibModal', '$log', '$http', function ($validation, $scope,  $uibModal, $log, $http) {



    var $validationProvider = $validation;
    $scope.form = {
        checkValid: $validationProvider.checkValid,

        reset: function(form) {
            $validationProvider.reset(form);
        },

        submit: function (form) {
            $validationProvider.validate(form)
                .success(function(){
                    $http({
                        method: 'POST',
                        data:$scope.user,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        url: 'Api/UserLogin'
                    }).then(function successCallback(response) { 
                        console.log('user logged in.....')
                    }, function errorCallback(response) {
                        console.log('user not logged in...')
                    });
                })
                .error(function(err){
                    console.log(err);
                });

            //console.log(validationResult);

        }
    };

    /*	$scope.validateLoginForm = function(){

     if(email == '' || !validateEmail(user.email)){
     emailError = true;
     }

     }*/

    /*	$scope.validateEmail =  function(email) {
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

/*
cubeRootApp.config(['$validationProvider', function ($validationProvider) {

    $validationProvider.validate()
        .success(function(){
            alert('validation successfull.')
        })
        .error(function(){
            alert('validation error.')
        });

}]);*/

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