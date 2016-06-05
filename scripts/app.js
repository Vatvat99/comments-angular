'use strict';

/**
 * Module principal de l'application
 */

// Création du module général de l'application
var app = angular.module('CommentsApp', ['ngRoute']);

// Configuration des routes
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'PostsCtrl'
        })
        .when('/post/:id', {
            templateUrl: 'views/single.html',
            controller: 'SingleCtrl'
        })
        .otherwise({redirectTo: '/'});
});
