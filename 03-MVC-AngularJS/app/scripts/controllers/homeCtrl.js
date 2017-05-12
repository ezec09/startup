angular.module('spotifyAppApp')
	.controller('homeCtrl',['$scope','$state','$http','localStorageService', function($scope,$state,$http,localStorage) {
		$scope.busqueda = '';
		$scope.cancionesfavoritas = [];
		
		$scope.buscarArtista = function (){
			if($scope.busqueda.length > 0) {
				$state.go('artistas',{busqueda: $scope.busqueda});
			}
		}

		function initialize(){
			var favoritos = localStorage.get('favoritos');
			if(favoritos!==null) {
				for(var i = 0; i < favoritos.length ; i++){
					$http.get('https://api.spotify.com/v1/tracks/' + favoritos[i]).then(function(response){$scope.cancionesfavoritas.push(response.data)},function(){});
				}
			}
		}
		initialize();
	}]);