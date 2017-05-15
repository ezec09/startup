angular.module('spotifyAppApp').directive('unArtista', function(){
		return {
			retrict: 'E',
			scope: {
				artista: '=artista'
			},
			templateUrl: 'scripts/directives/artistaView.html'
		};
	});