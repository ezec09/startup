angular.module('spotifyAppApp')
	.directive('unArtista', function(){
		return {
			retrict: 'E',
			scope: {
				artista: '=artista'
			},
			templateUrl: 'scripts/directives/artistaView.html'
		};
	})
	.directive('unAlbum', function(){
		return {
			retrict: 'E',
			scope: {
				album: '=album',
				artistname: '='
			},
			templateUrl: 'scripts/directives/albumView.html'
		};
	})
	.directive('focusear', function(){
		return {
			retrict: 'A',
			scope: {},
			link:function(scope,element,attr){
				element.focus();
			}
		};
	})
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
						favoritos.pop(scope.cancionid);
						element.children().first().addClass('fav-img').removeClass('fav-img-selected');
					} else {
						favoritos.push(scope.cancionid);
						element.children().first().addClass('fav-img-selected').removeClass('fav-img');
					}
					localStorage.set('favoritos',favoritos);
				});
			}
		}
	}])
	.directive('unaCancion', function(){
		return {
			retrict: 'E',
			scope: {
				cancion: '='
			},
			templateUrl: 'scripts/directives/cancionView.html'
		};
	});