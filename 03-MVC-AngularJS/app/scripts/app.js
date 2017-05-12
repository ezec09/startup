'use strict';

/**
 * @ngdoc overview
 * @name spotifyAppApp
 * @description
 * # spotifyAppApp
 *
 * Main module of the application.
 */
angular
  .module('spotifyAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'LocalStorageModule'
  ])
  .config(function($stateProvider, $urlRouterProvider){
  	$urlRouterProvider.otherwise('/home');

  	$stateProvider
  		.state('home', {
  			url: '/home',
  			templateUrl: "views/home.html",
        controller: "homeCtrl"
  		})
      .state('artistas', {
        url: '/artistas',
        params: {busqueda: null},
        templateUrl: "views/artists.html",
        controller: "artistaBusquedaCtrl"
      })
      .state('artistaElegido', {
        url: '/artistas/unArtista',
        params: {artistaSeleccionado: null},
        templateUrl: "views/artistaSeleccionado.html",
        controller: "artistaSeleccionadoCtrl"
      })
      .state('albumElegido', {
        url:'/artistas/:id/:albumNombre',
        params: {albumSeleccionado : null},
        templateUrl: "views/albumSeleccionado.html",
        controller: "albumSeleccionadoCtrl"
      });
  })
  .config(function (localStorageServiceProvider) {
    localStorageServiceProvider
    .setPrefix('spotifyAppAppStorage');
  });
