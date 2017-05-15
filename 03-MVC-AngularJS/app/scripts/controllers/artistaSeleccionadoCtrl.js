angular.module('spotifyAppApp')
	.controller('artistaSeleccionadoCtrl',['$scope','$stateParams', '$state','localStorageService','requestSpotify', function($scope,$stateParams,$state,localStorage,requestSpotify) {
		
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
			}
			requestSpotify.getAlbumLiteFromArtista($scope.artista.id,function(response){
					$scope.albumesLite = response.data.items;
					for(var i = 0; i < $scope.albumesLite.length; i++){		
						requestSpotify.getAlbumFullFromAlbumLite($scope.albumesLite[i].id,function(response){
							$scope.albumesFull.push(response.data);
						},function(){})
					}
			},function(){})
		}
		inicializar();
	}]);