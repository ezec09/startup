angular.module('spotifyAppApp')
	.controller('artistaSeleccionadoCtrl',['$scope','$stateParams', '$http', '$state','localStorageService', function($scope,$stateParams, $http,$state,localStorage) {
		
		$scope.albumesLite = [];
		$scope.albumesFull = [];

		$scope.nuevaBusqueda = function() {
			$state.go('artistas',{busqueda:$scope.busqueda});
		}

		function inicializar() {
			if( $stateParams.artistaSeleccionado!==null) {
				$scope.artista = $stateParams.artistaSeleccionado;
				localStorage.set('artistaElegido',$scope.artista);
			} else {
				$scope.artista = localStorage.get('artistaElegido');
				console.log("entra lol");
			}
			console.log($scope.artista);
			$http.get('https://api.spotify.com/v1/artists/' + $scope.artista.id + '/albums')
				.then(function(response){
					$scope.albumesLite = response.data.items;
					for(var i = 0; i < $scope.albumesLite.length; i++){		
						$http.get('https://api.spotify.com/v1/albums/'+$scope.albumesLite[i].id)
						.then(function(response){
							$scope.albumesFull.push(response.data);
						},function(){});
					}
				},function(){});
		}
		inicializar();
	}]);