document.addEventListener("DOMContentLoaded",init)

var seccionRepositorio = document.body.getElementsByTagName("section")[3];
var seccionAFadein = document.body.getElementsByTagName("section")[2];
var repoBuscadoCampo = document.getElementById("repo-buscado");

//Funciones que use para varios puntos -------------------------
function appendNodeWithText(parent, nodoTag, text){
	var nuevoElemento = document.createElement(nodoTag);
	var textoNode = document.createTextNode(text);
	nuevoElemento.appendChild(textoNode);
	parent.appendChild(nuevoElemento);
}
//Funciones para punto 4 ---------------------------------------
function fadein(elemento, wantedOpacity, aumentPerInterval,timer) {
	if(elemento.style.opacity != wantedOpacity) {
		elemento.style.opacity = Math.min(parseFloat(elemento.style.opacity)+aumentPerInterval,wantedOpacity);
	} else {
		clearInterval(timer);
	}
}
//--------------------------------------------------------------
//Funciones para punto 6 y 7 -----------------------------------
function appendRespuesta() {
	var articuloSeccion = document.body.getElementsByTagName("section")[2].getElementsByTagName("article")[0];
	appendNodeWithText(articuloSeccion,"p",this.responseText);
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
//--------------------------------------------------------------
//Funciones para punto 8 ---------------------------------------
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
//--------------------------------------------------------------
//Funciones para punto 9 ---------------------------------------
function crearliDeListas(parent, object/**/){
	var cantArguments = arguments.length;
	var i = 2;
	for(i;i<cantArguments;i++) {
		var texto = arguments[i] + ": "+ object[arguments[i]];
		appendNodeWithText(parent,"li",texto);
	}
}

function repositoriosPedidos() {		
	var repositoriosFullNames = JSON.parse(this.responseText).items;
	repositoriosFullNames.forEach(function(elem) {
		appendNodeWithText(seccionRepositorio,"p",elem["full_name"]);
		var lista = document.createElement("ul");
		seccionRepositorio.appendChild(lista);
		crearliDeListas(lista,elem.owner,"login");
		crearliDeListas(lista,elem,"description","url","watchers_count");
	});
}
//--------------------------------------------------------------
//Funciones para punto 10 --------------------------------------
function eliminarTagsFromParent(parent,nodoTag) {
	var nodosNoArray = seccionRepositorio.getElementsByTagName(nodoTag);
	var nodosArray = Array.prototype.slice.call(nodosNoArray);
	nodosArray.forEach(function(elem){parent.removeChild(elem)})
}

function teclaPressBuscador(){
	if(repoBuscadoCampo.value.length >= 5) {
		//CODIGO REPETIDO CAMBIAR
		eliminarTagsFromParent(seccionRepositorio,"p");
		eliminarTagsFromParent(seccionRepositorio,"ul");
		//-------------------------
		seccionRepositorio.getElementsByTagName("span")[0].innerText = repoBuscadoCampo.value;
		pedirRecurso("GET", "https://api.github.com/search/repositories?q="+repoBuscadoCampo.value, true , repositoriosPedidos);
	}
}
//--------------------------------------------------------------

function init() {
	//Punto 4 ejecucion---------------------------------
	seccionAFadein.style.opacity = 0;
	var efectoFadeIn = setInterval(fadein,100,seccionAFadein,1,0.1,efectoFadeIn);
	//--------------------------------------------------
	//Punto 6 - 7 ejecucion ----------------------------
	document.body.getElementsByTagName("button")[0].addEventListener("click", onClickPedirJoke);
	//-------------------------------------------------
	//Punto 8 ejecucion -------------------------------
	document.body.getElementsByTagName("button")[1].addEventListener("click", onClickProvocarSvError);
	//-------------------------------------------------
	//Punto 9 ejecucion -------------------------------
	//Con esto se consigue el punto 9
	pedirRecurso("GET", "https://api.github.com/search/repositories?q=JavaScript", true , repositoriosPedidos);
	//-------------------------------------------------
	//Punto 10 ejecucion ------------------------------
	repoBuscadoCampo.addEventListener("keyup",teclaPressBuscador);
	//-------------------------------------------------
}



