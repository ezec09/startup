document.addEventListener("DOMContentLoaded",init)

//Punto 4 ---------------------------------------
function init() {
	function fadein(seccion, wantedOpacity, aumentPerInterval,timer) {
		if(seccion.tagName.toLowerCase()=="section" && seccion.style.opacity != wantedOpacity) {
			seccion.style.opacity = Math.min(parseFloat(seccion.style.opacity)+aumentPerInterval,wantedOpacity);
		} else {
			clearInterval(timer);
		}
	}

	var seccionAFadein = document.body.getElementsByTagName("section")[2];
	seccionAFadein.style.opacity = 0;
	var efectoFadeIn = setInterval(fadein,100,seccionAFadein,1,0.1,efectoFadeIn);
	//------------------------------------------------
	//Punto 6 - 7 --------------------------------------
	function appendRespuesta() {
		var articuloSeccion = document.body.getElementsByTagName("section")[2].getElementsByTagName("article")[0];
		var nuevoP = document.createElement("p");
		var textoP = document.createTextNode(this.responseText);
		nuevoP.appendChild(textoP);
		articuloSeccion.appendChild(nuevoP);
	}

	function pedirRecurso(metodo, url, asincronico, funcionManejadora) {
		var pedido = new XMLHttpRequest();
		pedido.open(metodo,url,asincronico);
		pedido.addEventListener("load",funcionManejadora);
		pedido.send();
	}

	function onClickPedirJoke() {
		pedirRecurso("GET", "http://api.icndb.com/jokes/random",true,appendRespuesta	);
	}

	document.body.getElementsByTagName("button")[0].addEventListener("click", onClickPedirJoke);
	//-------------------------------------------------
	//Punto 8 ------------------------------------
	function between (aEvaluar, min, max) {
		return aEvaluar >= min && aEvaluar <= max;
	}

	function manejarRespuesta() {
		if (between(this.status,200,299)) {

		}
		else if(between(this.status,300,399)) {
	
		}
		else if(between(this.status,500,599)) {
			seccionAFadein.style.background = "red";
		}
	}

	function onClickProvocarSvError() {
		pedirRecurso("GET", "http://httpstat.us/500", true , manejarRespuesta);
	}
	document.body.getElementsByTagName("button")[1].addEventListener("click", onClickProvocarSvError);
	//-------------------------------------------------
	//Ej9-------------------------------------------
	var seccionRepositorio = document.body.getElementsByTagName("section")[3];

	function crearliDeListas(parent, object/**/){
		var cantArguments = arguments.length;
		var i = 2;
		for(i;i<cantArguments;i++) {
			var elementoLista = document.createElement("li");
			var texto = document.createTextNode(arguments[i] + ": "+ object[arguments[i]]);
			elementoLista.appendChild(texto);
			parent.appendChild(elementoLista);
		}
	}

	function repositoriosPedidos() {		
		var repositoriosFullNames = JSON.parse(this.responseText).items;
		repositoriosFullNames.forEach(function(elem) {
			var titulo = document.createElement("p");
			var texto = document.createTextNode(elem["full_name"]);
			titulo.appendChild(texto);
			seccionRepositorio.appendChild(titulo);
			var lista = document.createElement("ul");
			seccionRepositorio.appendChild(lista);
			crearliDeListas(lista,elem.owner,"login");
			crearliDeListas(lista,elem,"description","url","watchers_count");
		});
	}

	//Con esto se consigue el punto 8 
	pedirRecurso("GET", "https://api.github.com/search/repositories?q=JavaScript", true , repositoriosPedidos);
	//---------------------------------------------------
	//Ej 10--------------------------
	var repoBuscadoCampo = document.getElementById("repo-buscado");

	function teclaPressBuscador(){
		if(repoBuscadoCampo.value.length >= 5) {
			//CODIGO REPETIDO CAMBIAR
			var nodosNoArray = seccionRepositorio.getElementsByTagName("ul");
			var nodosArray = Array.prototype.slice.call(nodosNoArray);
			nodosArray.forEach(function(elem){seccionRepositorio.removeChild(elem)})
			var nodosNoArray = seccionRepositorio.getElementsByTagName("p");
			var nodosArray = Array.prototype.slice.call(nodosNoArray);
			nodosArray.forEach(function(elem){seccionRepositorio.removeChild(elem)})
			//-------------------------
			seccionRepositorio.getElementsByTagName("span")[0].innerText = repoBuscadoCampo.value;
			pedirRecurso("GET", "https://api.github.com/search/repositories?q="+repoBuscadoCampo.value, true , repositoriosPedidos);
		}
	}

	repoBuscadoCampo.addEventListener("keyup",teclaPressBuscador);
	//------------------------------------------------------
}



