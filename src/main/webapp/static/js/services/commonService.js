'use strict';
angular.module('CubeRootApp').
service('commonService',['$http','$q',function($http,$q){

    return {
        sendData : function(url, $data,successCallback,errorCallback) {
        try {
                $http({
                    method: 'POST',
                    data: $data,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    url: url
                }).then(successCallback, errorCallback);

            }  catch(e){
                console.log("Error sending data : "+e)
        }
        }
    }

    
}]);
