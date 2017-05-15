angular.module('spotifyAppApp')
	.controller('artistaBusquedaCtrl',['$scope','$stateParams','$state','localStorageService','requestSpotify',
		function($scope,$stateParams,$state,localStorage,requestSpotify) {
		$scope.resultados = [];
		
		$scope.buscarArtista = function(){
			if($scope.busqueda.length > 0) {
				localStorage.set('busqueda', $scope.busqueda);
				requestSpotify.getSearchOfArtist($scope.busqueda,function(response){
						$scope.resultados = response.data.artists.items;},function(){});
			}
			else {
				$state.go('home');
				localStorage.set('busqueda', '');
			}
		}

		function inicializar() {
			if($stateParams.busqueda!==null) {
				$scope.busqueda = $stateParams.busqueda;
			} else {
				$scope.busqueda = localStorage.get('busqueda');
			}
			$scope.buscarArtista();
		}
		inicializar();
	}])