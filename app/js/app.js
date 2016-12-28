 angular.module('app',['ngMaterial',
     'ngAnimate',
     'ngAria',
     'ngMessages',
     'ngRoute',
     'app.routes',
     'app.service',
     'app.controllers',
     'app.directive',
     'ngDialog',
     'mdColorPicker','ngFileUpload'])

     .config(function($mdThemingProvider) {
         $mdThemingProvider.theme('default')

             .primaryPalette('indigo',{
                 'default': '400'
            })
             .accentPalette('blue',{
                 'default':'A200'
             })

     });