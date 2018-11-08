var s;
var comida;
var scl = 20;

function setup() {
	frameRate(10);
	canvas = createCanvas(400, 400);
	s = new Snake();
	pickLocation();
	canvas.parent('game'); //coloca nosso cenario dentro da div game (HTML)
}

function draw() {
	background(0);
	if (s.eat(comida))
		pickLocation();
	s.death();
	s.update();
	s.show();
	fill("#d33f49");//Red for food
	rect(comida.x, comida.y, scl, scl);
	document.getElementById("score").innerHTML = "Score: " + s.total.toString();
}

function pickLocation() {
	var cols = floor(width / scl); //pega a largura e divide pela escala para obter o num de colunas #faço um grid com a escala
	var rows = floor(height / scl); //pega a altura e divide pela escala para manter o num de linhas
	comida = createVector(floor(random(cols)), floor(random(rows)));
	comida.mult(scl);
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
	this.total = 0;
	this.colour = "#77ba99";
	this.tail = [];

	this.update = function () { //isso eh um construtor, ou seja, para chamar a funcao update usaremos Snake.update (vide prog orientada a obj)
		if (this.total === this.tail.length) {
			for (var i = 0; i < this.tail.length - 1; i++) { //a posição atual da snake vai ser colocada no final sempre, mantendo um historico ([4 segundos,3 segundos,2 segundos,agora])
				this.tail[i] = this.tail[i + 1]; //defino o atual como sendo o ultimo
			}
		}
		this.tail[this.total - 1] = createVector(this.x, this.y);
		this.x = this.x + this.velx * scl; //quando usarmos essa this.x seria o equivalente a chamar Snake.x (entao pegaremos o valor de X direto da Classe Snake)
		this.y = this.y + this.vely * scl;
		


		this.x = constrain(this.x, 0, width - scl);
		this.y = constrain(this.y, 0, height - scl);
	};

	this.show = function () {
		for (var i = 0; i < this.tail.length; i++) {
			if(i===0)
				fill("#416653");
			rect(this.tail[i].x, this.tail[i].y, scl, scl);
			fill(this.colour);
		}
		fill(this.colour);
		rect(this.x, this.y, scl, scl); //Snake
	};

	this.dir = function (x, y) {
		this.velx = x;
		this.vely = y;
	};

	this.eat = function (pos) {
		var d = dist(this.x, this.y, pos.x, pos.y);
		if (d < 1) {
			this.total++;
			return true;
		} else {
			return false;
		}
	};

	this.death = function () {
		for (var i = 0; i < this.tail.length; i++) {
			var pos = this.tail[i];
			var d = dist(this.x, this.y, pos.x, pos.y);
			if (d < 1) {
				this.total = 0;
				this.tail = [];
				alert("YOU DIED! :(");
			}
		}
	};
}