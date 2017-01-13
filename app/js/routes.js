angular.module('app.routes', [])
    .config(function($routeProvider) {
        $routeProvider

            .when('/', {
                templateUrl : 'templates/main.html',
                controller  : 'mainController'
            })
            .when('/acerca', {
                templateUrl : 'templates/acerca.html',
                controller  : 'aboutController'
            })
            .when('/contacto', {
                templateUrl : 'templates/contacto.html',
                controller  : 'contactController'
            })
            .when('/ejemplo', {
                templateUrl : 'templates/ejemplo.html',
                controller  : 'ejemploController'
            })
            .otherwise({
                redirectTo: '/ejemplo'
            });

    })
