var s;
var comida;
var scl = 20;
function setup() {
	comida = createVector(random(width), random(height));
	frameRate(10);
	createCanvas(400, 400);
	s = new Snake();
}

function draw() {
	background(0);
	s.update();
	s.show();

	fill(255, 0, 100);
	rect(comida.x, comida.y, scl, scl);
}

function keyPressed() {
	if (keyCode === UP_ARROW)
		s.dir(0, -1);
	else if (keyCode === DOWN_ARROW)
		s.dir(0, 1);
	else if (keyCode === RIGHT_ARROW)
		s.dir(1, 0);
	else if (keyCode === LEFT_ARROW)
		s.dir(-1, 0);
}

function Snake() {
	this.x = 0;
	this.y = 0;
	this.velx = 1;
	this.vely = 0;

	this.update = function () { //isso eh um construtor, ou seja, para chamar a funcao update usaremos Snake.update (vide prog orientada a obj)
		this.x = this.x + this.velx * scl; //quando usarmos essa this.x seria o equivalente a chamar Snake.x (entao pegaremos o valor de X direto da Classe Snake)
		this.y = this.y + this.vely * scl;

		this.x = constrain(this.x, 0, width - scl);
		this.y = constrain(this.y, 0, height - scl);
	};

	this.show = function () {
		fill(255);
		rect(this.x, this.y, scl, scl);
	};

	this.dir = function(x, y) {
		this.velx = x;
		this.vely = y;
	};
}