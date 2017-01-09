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
            .when('/hola', {
                templateUrl : 'templates/hola.html',
                controller  : 'contactController'
            })
            .otherwise({
                redirectTo: '/'
            });

    })
