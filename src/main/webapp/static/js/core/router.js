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
    $urlRouterProvider.when("","/login");
    $urlRouterProvider.when("/","/login");


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
            url: '/appView',
            abstract:true,
            templateUrl: './views/logged_in.html',
            controller: 'appViewCtrl'
        })

/*        .state('appView.dashboard', {
            url: '/dashboard',
            parent:'appView',
            views: {
                "mainSidebar": {
                    templateUrl: './views/main_sidebar.html'
                },

                "content": {
                    templateUrl: './views/dashboard-performance.html',
                    controller: 'dashboardCtrl'
                }
            }
        })*/

        .state('appView.performance', {
            url: '/performance',
            parent:'appView',
            params:{
                parentTxt:'Dashboard',
                pageName:'Performance'
            },
            //abstract:true,
            views: {
                "mainSidebar": {
                    templateUrl: './views/main_sidebar.html'
                },
                "content": {
                    templateUrl: './views/dashboard-performance.html',
                    controller: 'dashboardPerformanceCtrl'
                },
                "impressions@appView.content":{
                    template:"performanceChartTpl"
                }
            }
        })

        /*.state('appView.performance.impressions', {
            url: '/impressions',
            parent:'appView.performance',
            params:{
                parentTxt:'Dashboard',
                pageName:'Performance > Impressions'
            },
            views: {
                "mainSidebar": {
                    templateUrl: './views/main_sidebar.html',
                },

                "content": {
                    templateUrl: './views/dashboard-performance.html',
                    controller: 'dashboardCtrl',
                    view:{
                        template: 'performanceChartTpl'
                    }
                }
            }
        })*/

        .state('appView.audiences', {
            url: '/audiences',
            parent:'appView',
            params:{
                parentTxt:'Dashboard',
                pageName:'Audiences'
            },
            controller:'appViewCtrl',
            views: {
                "mainSidebar": {
                    templateUrl: './views/main_sidebar.html',
                },

                "content": {
                    templateUrl: './views/dashboard-audiences.html',
                    controller: 'dashboardAudiencesCtrl'
                }
            }
        })
        .state('appView.idealtarget', {
            url: '/idealtarget',
            parent:'appView',
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
            parent:'appView',
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
            parent:'appView',
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