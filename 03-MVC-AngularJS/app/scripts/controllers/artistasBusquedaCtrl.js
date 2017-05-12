angular.module('spotifyAppApp')
	.controller('artistaBusquedaCtrl',['$scope','$stateParams','$http','$state','localStorageService',function($scope,$stateParams,$http,$state,localStorage) {
		$scope.resultados = [];
		
		$scope.buscarArtista = function(){
			if($scope.busqueda.length > 0) {
				localStorage.set('busqueda', $scope.busqueda);
				var url = 'https://api.spotify.com/v1/search?q=' + $scope.busqueda + '&type=artist';
				$http.get(url).then(function succesCallBack(response){
						$scope.resultados = response.data.artists.items;
						},function errorCallBack(response){
						})
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