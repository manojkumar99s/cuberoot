var cubeRootApp =  angular.module('CubeRootApp');
cubeRootApp.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
/*
    var loggedIn = document.getElementById('loggedIn').value;
    if (loggedIn != 'true') {
        $urlRouterProvider.otherwise('login');
    } else {
        $urlRouterProvider.otherwise('notFound');
    }*/


    //$urlRouterProvider.otherwise('/performance');

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: './views/login.html',
            controller:'loginCtrl'
        })
        .state('signup', {
            url: '/signup',
            templateUrl: './views/signup.html',
            controller:'signupController'
        })
        .state('appView',{
            //url: '/loggedIn',
            abstract:true,
            templateUrl: './views/logged_in.html',
            controller: 'appViewCtrl'
        })


        .state('appView.dashboard', {
            url: '/dashboard',
            views: {
                "mainSidebar": {
                    templateUrl: './views/main_sidebar.html',
                },

                "content": {
                    templateUrl: './views/dashboard-performance.html',
                    controller: 'dashboardCtrl'
                }

            },
            //abstract:true
        })

        .state('appView.performance', {
            url: '/performance',

            params:{
                parentTxt:'Dashboard',
                pageName:'Performance'
            },
            views: {
                "mainSidebar": {
                    templateUrl: './views/main_sidebar.html',
                },

                "content": {
                    templateUrl: './views/dashboard-performance.html',
                    controller: 'dashboardCtrl'
                }
            }
        })

        .state('appView.audiences', {
            url: '/audiences',
            params:{
                parentTxt:'Dashboard',
                pageName:'Audiences'
            },
            views: {
                "mainSidebar": {
                    templateUrl: './views/main_sidebar.html',
                },

                "content": {
                    templateUrl: './views/dashboard-audiences.html',
                    controller: 'dashboardCtrl'
                }
            }
        })
        .state('appView.idealtarget', {
            url: '/idealtarget',
            params:{
                parentTxt:'Dashboard',
                pageName:'Ideal Target'
            },
            views: {
                "mainSidebar": {
                    templateUrl: './views/main_sidebar.html',
                },

                "content": {
                    templateUrl: './views/dashboard-idealtarget.html',
                    controller: 'dashboardCtrl'
                }
            }
        })
        .state('appView.campaign', {
            url: '/campaign',
            params:{
                pageName:'Manage Campaign'
            },
            views: {
                "mainSidebar": {
                    templateUrl: './views/main_sidebar.html'
                },
                "content": {
                    templateUrl: './views/campaign.html',
                    controller: 'campaignCtrl'
                }
            }

        })
        .state('appView.creatives', {
            url: '/creatives',
            params:{
                pageName:'Manage Creatives'
            },
            views: {
                "mainSidebar": {
                    templateUrl: './views/main_sidebar.html'
                },
                "content": {
                    templateUrl: './views/creatives.html',
                    controller: 'campaignCtrl',
                }
            },
            params:{
                pageName:'Manage Creatives'
            }

        });;
}])
/*
.run(['$rootScope', '$state', '$stateParams',
    function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }])*/;