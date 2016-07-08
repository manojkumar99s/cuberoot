"use strict";
angular.module('CubeRootApp')
    .controller("appViewCtrl",function($scope, $state){
        $scope.$state = $state;
});