angular.module('spotifyAppApp')
	.directive('unaCancion', function(){
		return {
			retrict: 'E',
			scope: {
				cancion: '='
			},
			templateUrl: 'scripts/directives/cancionView.html',
			controller : ['$scope','$element','localStorageService',function($scope,$element,localStorage) {
				$scope.borrarFavorito = function() {
					var favoritos = localStorage.get('favoritos');
					for(var i = 0; i < favoritos.length; i++) {
						if(favoritos[i] === $scope.cancion.id){
							favoritos.splice(i,1);
							break;
						}
					}
					localStorage.set('favoritos',favoritos);
					$element.remove();
				}
			}]

		};
	});