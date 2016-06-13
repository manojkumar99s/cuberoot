var cubeRootApp =  angular.module('CubeRootApp');
cubeRootApp.controller("signupController",['$scope', '$http', function($scope, $http){

	$scope.form = {};
	$scope.submitSignupForm = function(){
		
		$http({
			  method: 'POST',
			  data:$scope.form,
			  headers: {
				   'Content-Type': 'application/json'
			  },
			  url: 'Api/UserRegistration'
			}).then(function successCallback(response) {
			    console.log('Registration form submitted.')
			  }, function errorCallback(response) {
				  console.log('Registration for not submitted..')
		  });
	};

}])
