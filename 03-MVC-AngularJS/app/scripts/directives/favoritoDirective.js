angular.module('spotifyAppApp')
	.directive('favorito',['localStorageService',function(localStorage){
		return {
			retrict: 'E',
			scope:{cancionid: '='},
			templateUrl:'scripts/directives/fav.html',
			link:function(scope,element,attr) {

				initialize();

				function initialize() {
					var favoritos = localStorage.get('favoritos');
					if(favoritos===null){
						return;
					}
					else if(favoritos.includes(scope.cancionid)){
						element.children().first().addClass('fav-img-selected').removeClass('fav-img');
					} else {
						element.children().first().addClass('fav-img').removeClass('fav-img-selected');
					}
				}

				element.on('click',function(){
					//console.log(element.children()[0].addClass('Pepe'));
					var favoritos = localStorage.get('favoritos');
					if(favoritos===null){
						favoritos= [];
					}
					if(favoritos.includes(scope.cancionid)){
						var i;
						for(i = 0; i < favoritos.length; i++) {
							if(favoritos[i] === scope.cancionid){
								break;
							}
						}
						favoritos.splice(i,1);
						element.children().first().addClass('fav-img').removeClass('fav-img-selected');
					} else {
						favoritos.push(scope.cancionid);
						element.children().first().addClass('fav-img-selected').removeClass('fav-img');
					}
					localStorage.set('favoritos',favoritos);
				});
			}
		}
	}]);