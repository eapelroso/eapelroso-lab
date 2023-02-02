var width = window.innerWidth;
var height = window.innerHeight;
var CANVAS_ID = "myCanvas"

var PARTICLES_COUNT = 1000;
var MINIMUM_LIFE = 50;
var MAXIMUM_LIFE = 100;
var MINIMUM_DIAMETER = 5;
var MAXIMUM_DIAMETER = 15;
var AMPLITUDE = 50;
var lastRender = 0

var objects = [];

class Color{
	constructor(r, g, b, a){
		this.red = r;
		this.green = g;
		this.blue = b;
		this.alpha = a;
	}

	getRGBA(){
		return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
	}
}

class Particle {    
	constructor(){  
		this.setNewFireObject();
	}    
  
	setNewFireObject(){
		this.sin = getRandomBool();
		this.yCenter = height + 100 - getRandomInt(50);
		this.diameter = MAXIMUM_DIAMETER;
		this.radius = this.diameter / 2;  
		this.speed = 5;
		this.life = getRandomInt(MAXIMUM_LIFE) + MINIMUM_LIFE;
		this.xCenter = getRandomInt(width);
	}

	getColor(){
		let alpha = this.life * 255 / MAXIMUM_LIFE;
		let green = (this.life / 2) * 255 / MAXIMUM_LIFE;
		let col = new Color(255,green,0, alpha);    
		return col;
	}
  
	getDiameter(){
		return this.life * MAXIMUM_DIAMETER / MAXIMUM_LIFE;
	}
  
	update() {   
		this.yCenter -= this.speed;    

		if (this.sin)
			this.xMovement = (AMPLITUDE * (Math.sin(degToRad(this.yCenter)))) + this.xCenter; //float
		else
			this.xMovement = (AMPLITUDE * (Math.cos(degToRad(this.yCenter)))) + this.xCenter; //float


		if (this.life > 0)
			this.life--;
		else{
			this.setNewFireObject();
		}
	} 
} 

getRandomBool = () => {
	return Math.random() < 0.5;
}

getRandomInt = (max) => {
	return Math.floor(Math.random() * max);
}

degToRad = (deg) => {
    return deg * (Math.PI / 180.0);
}

addFire = (mouseX, mouseY) => {
	let obj = new Particle();
	obj.setNewFireObject();
	obj.xCenter = mouseX;
	obj.yCenter = mouseY;
	objects.push(obj);
	PARTICLES_COUNT++; 
}

addParticles = () => {
	for (i = 0; i < PARTICLES_COUNT ; i++){  
		obj = new Particle();          
		objects.push(obj); 
	}
}

addEvents = () => {
	let canvas = document.getElementById(CANVAS_ID);
	
	canvas.addEventListener('mousemove', e => {
		trackMouse(e.offsetX, e.offsetY);
	}, false);

	canvas.addEventListener('touchstart', function(e){
		trackMouse(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
	});

	canvas.addEventListener('touchmove', function(e){
		e.preventDefault();
		trackMouse(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
	});	
}

init = () => {
	addEvents();
	drawFrame();
	addParticles();
}

drawFrame = () => {
	let canvas = document.getElementById(CANVAS_ID);

	if (canvas.getContext){
		canvas.width = width;
  		canvas.height = height;
		let ctx = canvas.getContext('2d')
		ctx.fillStyle = "#000000";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.lineWidth = 1;
		ctx.strokeStyle = '#000000';
		ctx.strokeRect(0, 0, width, height);
	}
}

drawCircle = (x, y, radio, color = '#00FF00', fillcolor = '#00FF00') => {
	let canvas = document.getElementById(CANVAS_ID);
	if (canvas.getContext){
		let ctx = canvas.getContext('2d');
		ctx.strokeStyle = color;
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(x, y, radio, 0, 2 * Math.PI);
		ctx.fill();
	}
}
		
draw = () => {		
	drawFrame();

	for (i = 0; i < PARTICLES_COUNT; i++){ 
		objects[i].update();

		drawCircle(objects[i].xMovement, objects[i].yCenter,  objects[i].getDiameter(), objects[i].getColor().getRGBA());   	 
	}
}

trackMouse = (mouseX, mouseY) => {
	addFire(mouseX, mouseY);
}

loop = (timestamp) => {
	var progress = timestamp - lastRender;

	draw();

	lastRender = timestamp;
	window.requestAnimationFrame(loop);
}

init();

window.requestAnimationFrame(loop)
