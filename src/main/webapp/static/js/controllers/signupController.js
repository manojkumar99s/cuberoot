"use strict";

var cubeRootApp =  angular.module('CubeRootApp');
cubeRootApp.controller("signupController",['$scope', '$http','$validation',
	function($scope, $http, $validation){

	var $validationProvider = $validation;
	$scope.registrationForm = {};

/*
	$scope.matchPassword = function(){
		if($scope.registrationForm.password != $scope.registrationForm.retypePassword){
			$scope.registrationForm.password.$error=true;
			$scope.registrationForm.retypePassword.$error=true;
		}
	}
*/

	$scope.form = {
		checkValid: $validationProvider.checkValid,

		reset: function(form) {
			$validationProvider.reset(form);
		},

		submit: function (form) {
			$validationProvider.validate(form)
				.success(function() {

					$scope.registrationForm.phone = parseInt($scope.registrationForm.phone);
					$scope.registrationForm.zip = parseInt($scope.registrationForm.zip);

					$http({
						method: 'POST',
						data: $scope.registrationForm,
						headers: {
							'Content-Type': 'application/json'
						},
						url: 'Api/UserRegistration'
					}).then(function successCallback(response) {
						console.log('Registration form submitted.')
					}, function errorCallback(response) {
						console.log('Registration for not submitted..')
					});
				})
				.error(function(){});
		}
	};

}]);
