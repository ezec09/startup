angular.module('spotifyAppApp')
	.controller('albumSeleccionadoCtrl',['$scope','$stateParams', '$state','localStorageService','requestSpotify', 
		function($scope,$stateParams, $state,localStorage,requestSpotify) {
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
			requestSpotify.getSongsFromAlbum($scope.album.id,function(response){
				$scope.canciones = response.data.items;
			},function(){});

		}

		inicializar();

	}]);