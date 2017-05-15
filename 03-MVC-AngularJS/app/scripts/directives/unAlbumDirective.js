angular.module('spotifyAppApp').directive('unAlbum', function(){
		return {
			retrict: 'E',
			scope: {
				album: '=',
				artistname: '='
			},
			templateUrl: 'scripts/directives/albumView.html'
		};
	});