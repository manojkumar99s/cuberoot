'use strict';
angular.module('CubeRootApp')
    .controller('loginCtrl', ['$validation','$scope',  '$uibModal', '$log', '$http', '$state', 'commonService',
        function ($validation, $scope,  $uibModal, $log, $http, $state, commonService) {

    $scope.sendData = commonService.sendData;


    var $validationProvider = $validation;
    $scope.form = {
        checkValid: $validationProvider.checkValid,

        reset: function(form) {
            $validationProvider.reset(form);
        },

        submit: function (form) {
            try {
                $validationProvider.validate(form)
                    .success(function () {
                        $scope.sendData(
                            'Api/UserLogin', //url
                            $scope.user, // data
                            function () {
                                //success call back
                                $state.transitionTo('appView.dashboard', '', {
                                    reload: true, inherit: true, notify: true
                                });
                            },
                            function () {
                                //error call back
                                $state.transitionTo('appView.dashboard', '', {
                                    reload: true, inherit: true, notify: true
                                });
                            });
                    })
                    .error(function (err) {
                        //form error call back
                        //console.log(err);
                    });
            }catch(e){};
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
            controller: 'forgotPasswordCtrl',
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
}])
.controller('forgotPasswordCtrl', ['$scope','$rootScope' , '$uibModalStack', 'items', '$validation', 'commonService',
    function ($scope, $rootScope, $uibModalStack, items, $validation, commonService) {

    var $validationProvider = $validation;
    $scope.sendData = commonService.sendData;

    $scope.ok = function () {
        $uibModalStack.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $uibModalStack.dismiss('cancel');
    };

    $scope.form= {
        checkValid: $validationProvider.checkValid,

        submit: function (form) {
            $validationProvider.validate(form)
                .success(function(){
                    $scope.sendData(
                        'Api/forgotPassword', //url
                        $scope.user, // data
                        function(){
                            //success call back

                        }, function(){
                            //error call back
                        });

                });
        }
    };
}]);


/*
 .config(['$validationProvider', function ($validationProvider) {

 $validationProvider.validate()
 .success(function(){
 alert('validation successfull.')
 })
 .error(function(){
 alert('validation error.')
 });

 }]);*/