angular.module('spotifyAppApp').factory('requestSpotify',
	['$http',function($http) {

		function getSongsFromAlbum(idAlbum,succes,error){
			$http.get('https://api.spotify.com/v1/albums/' + idAlbum + '/tracks')
			.then(succes,error);
		}

		function getSearchOfArtist(search,succes,error){
			$http.get('https://api.spotify.com/v1/search?q=' + search + '&type=artist')
			.then(succes,error);
		}

		function getAlbumLiteFromArtista(idArtist,succes,error) {
			$http.get('https://api.spotify.com/v1/artists/' + idArtist + '/albums')
			.then(succes,error);
		}

		function getAlbumFullFromAlbumLite(idAlbum,succes,error) {
			$http.get('https://api.spotify.com/v1/albums/'+ idAlbum)
			.then(succes,error);
		}

		return {
			getSongsFromAlbum : getSongsFromAlbum,
			getSearchOfArtist : getSearchOfArtist,
			getAlbumLiteFromArtista : getAlbumLiteFromArtista,
			getAlbumFullFromAlbumLite : getAlbumFullFromAlbumLite
		}
	}
]);