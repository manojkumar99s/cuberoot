<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Advant Edeges</title>

    <!-- Global stylesheets -->
        <link href="static/css/icons/icomoon/styles.css" rel="stylesheet" type="text/css">
        <link href="static/css/bootstrap.css" rel="stylesheet" type="text/css">
        <link href="static/css/core.css" rel="stylesheet" type="text/css">
        <link href="static/css/components.css" rel="stylesheet" type="text/css">
        <link href="static/css/colors.css" rel="stylesheet" type="text/css">
        <link href="static/css/custom.css" rel="stylesheet" type="text/css">
        <link href="static/css/fonts.css" rel="stylesheet" type="text/css">
        <link href="static/css/angular-ui-grid.css" rel="stylesheet" type="text/css">

<!--
        <link rel="stylesheet" href="http://ui-grid.info/release/ui-grid.css" type="text/css" />
-->
    <!-- /global stylesheets -->

    <!-- Core JS files -->
    <script type="text/javascript" src="static/js/core/lib/jquery.min.js"></script>
    <script type="text/javascript" src="static/js/core/lib/bootstrap.min.js"></script>

    <!-- Load library -->
    <script type="text/javascript" src="static/js/plugins/visualization/d3/d3.min.js"></script>

    <!-- Load tooltip -->
    <script type="text/javascript" src="static/js/plugins/visualization/d3/d3_tooltip.js"></script>
    <!-- /core JS files -->
</head>

<body ng-app="CubeRootApp">
<div ng-controller="jqueryScriptsCtrl"></div>
<!-- Main navbar -->
<div class="navbar navbar-default header-highlight">
    <div class="navbar-header">
        <a class="navbar-brand" href="default.html"><img src="static/images/logo_light.png" alt=""></a>

        <ul class="nav navbar-nav visible-xs-block">
            <li><a data-toggle="collapse" data-target="#navbar-mobile"><i class="icon-tree5"></i></a></li>
            <li><a class="sidebar-mobile-main-toggle"><i class="icon-paragraph-justify3"></i></a></li>
        </ul>
    </div>

    <div class="navbar-collapse collapse" id="navbar-mobile">
        <ul class="nav navbar-nav">
            <li><a class="sidebar-control sidebar-main-toggle hidden-xs"><i class="icon-paragraph-justify3"></i></a></li>
        </ul>

        <ul class="nav navbar-nav navbar-right">
            <li><a href="#">Text link</a></li>

            <li>
                <a href="#">
                    <i class="icon-cog3"></i>
                    <span class="visible-xs-inline-block position-right">Icon link</span>
                </a>
            </li>

            <li class="dropdown dropdown-user">
                <a class="dropdown-toggle" data-toggle="dropdown">
                    <img src="static/images/image.png" alt="">
                    <span>Victoria</span>
                    <i class="caret"></i>
                </a>

                <ul class="dropdown-menu dropdown-menu-right">
                    <li><a href="#"><i class="icon-user-plus"></i> My profile</a></li>
                    <li><a href="#"><i class="icon-coins"></i> My balance</a></li>
                    <li><a href="#"><span class="badge badge-warning pull-right">58</span> <i class="icon-comment-discussion"></i> Messages</a></li>
                    <li class="divider"></li>
                    <li><a href="#"><i class="icon-cog5"></i> Account settings</a></li>
                    <li><a href="#"><i class="icon-switch2"></i> Logout</a></li>
                </ul>
            </li>
        </ul>
    </div>
</div>
<!-- /main navbar -->

    <input type="hidden" value="true" id="loggedIn" />
    <!-- Page container -->
    <div class="page-container">
        <ui-view></ui-view>
    </div>
    <!-- /page container -->

    <!-- angularjs files -->

    <script type="text/javascript" src="static/js/core/lib/angular.min.js"></script>
    <script type="text/javascript" src="static/js/core/lib/angular-ui-router.js"></script>

    <!-- angular plugins for sortable dynamic tabular data -->
    <script type="text/javascript" src="static/js/core/lib/angular-touch.js"></script>
    <script type="text/javascript" src="static/js/core/lib/angular-animate.js"></script>
    <script type="text/javascript" src="static/js/core/lib/angular-ui-grid.js"></script>
    <!-- /angular plugins for sortable dynamic tabular data -->
    <!--
        <script type="text/javascript" src="../assets/js/core/lib/ui-bootstrap/ui-bootstrap-custom-1.3.3.min.js"></script>
    -->
    <script type="text/javascript" src="static/js/core/lib/ui-bootstrap/ui-bootstrap-custom-tpls-1.3.3.min.js"></script>
    <!-- /angular js files -->

    <!-- Angular App JS files -->
    <script type="text/javascript" src="static/js/core/app.js"></script>
    <script type="text/javascript" src="static/js/core/router.js"></script>
    <script type="text/javascript" src="static/js/controllers/jqueryScripts.js"></script>
    <script type="text/javascript" src="static/js/controllers/dashboardController.js"></script>
    <script type="text/javascript" src="static/js/controllers/uib.datepicker.js"></script>
    <script type="text/javascript" src="static/js/controllers/tabular.js"></script>
    <script type="text/javascript" src="static/js/controllers/modalController.js"></script>
    <script type="text/javascript" src="static/js/controllers/loginController.js"></script>
    <script type="text/javascript" src="static/js/controllers/signupController.js"></script>
    <script type="text/javascript" src="static/js/controllers/appViewCtrl.js"></script>

    <!-- /Angular App JS files -->

    <!--<link href="https://fonts.googleapis.com/css?family=Roboto:400,300,100,500,700,900" rel="stylesheet" type="text/css" />-->

</body>
</html>
