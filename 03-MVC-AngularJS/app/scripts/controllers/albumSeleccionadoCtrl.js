angular.module('spotifyAppApp')
	.controller('albumSeleccionadoCtrl',['$scope','$stateParams', '$http','$state','localStorageService', function($scope,$stateParams, $http,$state,localStorage) {
		$scope.canciones = [];
		$scope.ordenimientoEstados = [{ordenar:false,desc:'(unorder)'},{ordenar:true,reverse:false,desc:'(asc)'},{ordenar:true,reverse:true,desc:'(desc)'}]
		$scope.ordenamiento = $scope.ordenimientoEstados[0];
		var i = 0;

		$scope.nuevaBusqueda = function() {
			$state.go('artistas',{busqueda:$scope.busqueda});
		}

		$scope.cambiarOrdenamiento = function() {
			console.log(i);
			if(i==2){
				i=0;
			} else {
				i++;
			}
			$scope.ordenamiento = $scope.ordenimientoEstados[i];
		}

		function inicializar() {
			if($stateParams.albumSeleccionado) {
				$scope.album = $stateParams.albumSeleccionado;
				localStorage.set('albumElegido',$scope.album);
			} else {
				$scope.album = localStorage.get('albumElegido');
			}

			$http.get('https://api.spotify.com/v1/albums/' + $scope.album.id + '/tracks')
			.then(function(response){
				$scope.canciones = response.data.items;
			},function(){});
		}

		inicializar();

	}]);