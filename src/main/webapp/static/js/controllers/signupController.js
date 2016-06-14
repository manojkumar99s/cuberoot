"use strict";

var cubeRootApp =  angular.module('CubeRootApp');
cubeRootApp.controller("signupController",['$scope', '$http','$validation', function($scope, $http, $validation){

	var $validationProvider = $validation;
	$scope.registrationForm={};
	$scope.form = {
		checkValid: $validationProvider.checkValid,

		reset: function(form) {
			$validationProvider.reset(form);
		},

		submit: function (form) {
			$validationProvider.validate(form)
				.success(function() {
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
