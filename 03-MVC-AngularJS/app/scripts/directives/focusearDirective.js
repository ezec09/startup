angular.module('spotifyAppApp').directive('focusear', function(){
		return {
			retrict: 'A',
			scope: {},
			link:function(scope,element,attr){
				element.focus();
			}
		};
	});