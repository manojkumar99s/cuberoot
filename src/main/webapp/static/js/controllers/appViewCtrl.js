"use strict";

var cubeRootApp =  angular.module('CubeRootApp');
cubeRootApp.controller("appViewCtrl",function($scope, $state){
        $scope.$state = $state;
});