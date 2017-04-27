document.addEventListener("DOMContentLoaded",testear);

var terminator;
//Punto 1, 2, 4--------------------------------
function Movie(title,year,duration) {
	EventEmitter.call(this);
	this.title = title;
	this.yeat = year;
	this.duration = duration;
	this.actores = [];//
}

Movie.prototype = Object.create(EventEmitter.prototype);
Movie.prototype.play = function(){
	console.log("Playing: " + this.title);
	this.emit("play");//Parte del punto 4
}

Movie.prototype.pause = function(){
	console.log("Paused: " + this.title);
	this.emit("pause");//Parte del punto 4
}

Movie.prototype.resume = function(){
	console.log("Resumed: " + this.title);
	this.emit("resume");//Parte del punto 4
}

Movie.prototype.addCasts = function(cast) { //funcion para punto 8
	this.actores = this.actores.concat(cast);
}
//---------------------------------------------
//Punto 3--------------------------------------
function EventEmitter() {
	//Creo from null para q sea totalmente vacio
	this.map = Object.create(null);
}

EventEmitter.prototype.on = function(evento,queHacer) {
	this.map[evento] = queHacer;
}

EventEmitter.prototype.emit = function(evento) {
	if(this.map[evento]!=null)
		this.map[evento](evento);
}

EventEmitter.prototype.off = function(evento) {
	delete this.map[evento];
}
//---------------------------------------------
//Punto 5--------------------------------------
function Logger(){}

Logger.prototype.log = function(info) {
	console.log("The " + info + " event has been emitted");
}
//---------------------------------------------
//Punto 7--------------------------------------
function Actor(nombre,edad){
	this.nombre = nombre;
	this.edad = edad;
}
//---------------------------------------------

function testear() {
	//Punto 1 to 5----------------------------------
	console.log("TESTEANDO PUNTOS 1 - 5");
	var logger = new Logger();
	terminator = new Movie("Terminator","2000","100");
	terminator.on("play",logger.log);
	terminator.on("resume",logger.log);
	terminator.play();
	terminator.pause();
	terminator.resume();
	var rocky = new Movie("Rocky","1900","400");
	rocky.on("pause",logger.log);
	rocky.play();
	rocky.pause();
	rocky.resume();
	console.log("Borren evento pause en rocky");
	rocky.off("pause");
	rocky.pause();
	console.log("FIN TEST PUNTOS 1 - 5");
	//----------------------------------------------
	//Punto 8---------------------------------------
	console.log("TESTEANDO PUNTOS 7 - 8");
	var silv = new Actor("Silvester Stalone",58);
	var arnold = new Actor("Arnold Swa...",60);
	terminator.addCasts(silv);
	rocky.addCasts(silv);
	console.log(rocky.actores);
	console.log(terminator.actores);
	console.log("FIN TEST PUNTOS 7 - 8");
	//----------------------------------------------
}



