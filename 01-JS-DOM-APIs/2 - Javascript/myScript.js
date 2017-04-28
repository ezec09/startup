document.addEventListener("DOMContentLoaded",testear);

var terminator;
var rocky;
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
//Punto 6--------------------------------------
var social = {
	share : function(friendName){return "Share " + this.title + " with " + friendName;},
	like : function(friendName){return friendName +" likes "+ this.title;}
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
	rocky = new Movie("Rocky","1900","400");
	terminator.on("play",logger.log);
	terminator.on("resume",logger.log);
	terminator.play();
	terminator.pause();
	terminator.resume();

	rocky.on("pause",logger.log);
	rocky.play();
	rocky.pause();
	rocky.resume();
	console.log("Borre evento pause en rocky");
	rocky.off("pause");
	rocky.pause();
	console.log("FIN TEST PUNTOS 1 - 5");
	//----------------------------------------------
	//Punto 6---------------------------------------
	console.log("TESTEANDO PUNTOS 6");
	Object.assign(terminator, social);
	Object.assign(rocky, social);
	console.log(terminator.share("Pepe"));
	console.log(rocky.like("Pepito"));
	console.log("FIN TEST PUNTOS 6");
	//Punto 8 y 7-----------------------------------
	console.log("TESTEANDO PUNTOS 7 - 8");
	var silv = new Actor("Silvester Stalone",58);
	var arnold = new Actor("Arnold Swa...",60);
	terminator.addCasts(arnold);
	rocky.addCasts(silv);
	console.log(rocky.actores);
	console.log(terminator.actores);
	var otherCast = [
	  new Actor('Paul Winfield', 50),
	  new Actor('Michael Biehn', 50),
	  new Actor('Linda Hamilton', 50)
	];
	console.log("Agrego array a terminator");
	terminator.addCasts(otherCast);
	console.log(terminator.actores);
	console.log("FIN TEST PUNTOS 7 - 8");
	//----------------------------------------------
}



