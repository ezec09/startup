angular.module('spotifyAppApp')
	.filter('msToString', function(){
		return function(s){
			var ms = s % 1000;
	        s = (s - ms) / 1000;
	        var secs = s % 60;
	        s = (s - secs) / 60;
	        var mins = s % 60;
	        var hrs = (s - mins) / 60;

	        return hrs + ':' + mins + ':' + secs;   
		};
	})
	.filter('ordenar',['orderByFilter', function(orderBy) { 
		return function(valor,ordenar,reverse){
			if(ordenar){
				return orderBy(valor,'duration_ms',reverse);
			}else{
				return valor;
			}
		}
	}]);
	