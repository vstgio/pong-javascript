var canvas;
var cContext;

var ballPositionX = 10;
var ballPositionY = 10;
var ballSpeedX = 6;
var ballSpeedY = 6;

var player01 = {
	score : 0,
	positionY : 250
}
var player02 = {
	score : 0,
	positionY : 250
}

const FRAMES_PER_SECOND = 30;
const BALL_DIMENSIONS = 15;
const PLAYER_WIDTH = 10;
const PLAYER_HEIGHT = 100;


function getMousePosition (evt) {
	var gameRect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	//CALCULA A POSICAO DO MOUSE EM RELACAO À CAIXA DO JOGO
	var mouseX = evt.clientX - gameRect.left - root.scrollLeft;
	var mouseY = evt.clientY - gameRect.top - root.scrollTop;

	return { x: mouseX, y: mouseY }
}

window.onload = function () {
	
	canvas = document.getElementById("gameCanvas");
	cContext = canvas.getContext("2d");
	
	setInterval(function(){
		updatePositions();
		drawElements();
	}, 1000/FRAMES_PER_SECOND);

	canvas.addEventListener("mousemove", function(evt) {
		var mousePosition = getMousePosition(evt);
		player01.positionY = mousePosition.y - (PLAYER_HEIGHT/2);
	});

}

function updatePositions () {

	opponentMovement();

	ballPositionX += ballSpeedX;
	ballPositionY += ballSpeedY;

	if (ballPositionX < 0) {
		checkCollision(player01);
	}
	if (ballPositionX > canvas.width) {
		checkCollision(player02);
	}
	if (ballPositionY < 0) {
		ballSpeedY = -ballSpeedY;
	}
	if (ballPositionY > canvas.height) {
		ballSpeedY = -ballSpeedY;
	}
}

function drawElements () {
	drawRect(0, 0, canvas.width, canvas.height, "black");
	drawRect(0, player01.positionY, PLAYER_WIDTH, PLAYER_HEIGHT, "white");
	drawRect(canvas.width-PLAYER_WIDTH, player02.positionY, PLAYER_WIDTH, PLAYER_HEIGHT, "white");
	drawRect(ballPositionX, ballPositionY, BALL_DIMENSIONS, BALL_DIMENSIONS, "white");
	cContext.fillText(player01.score, 100, 100);
	cContext.fillText(player02.score, canvas.width-100, 100);
}

function drawRect (customLeft, customTop, customWidth, customHeight, customColor) {
	cContext.fillStyle = customColor;
	cContext.fillRect(customLeft, customTop, customWidth, customHeight);
}

function checkCollision (player) {
	if ((ballPositionY + (BALL_DIMENSIONS/2)) > player.positionY && 
		(ballPositionY + (BALL_DIMENSIONS/2)) < (player.positionY + PLAYER_HEIGHT)) {

		ballSpeedX = -ballSpeedX;

	} else {
	
		playerScored(player);
	}
}

function opponentMovement () {
	var player02Center = player02.positionY + (PLAYER_HEIGHT/2);

	//A MARGEM DE 35 FOI USADA PARA DEIXAR O MOVIMENTO DO OPONENTE MAIS SUAVE
	if (player02Center < ballPositionY - 35) {
		player02.positionY += 6;
	} else if (player02Center > ballPositionY + 35) {
		player02.positionY -= 6;
	}
}

function playerScored (player) {

	//SE O PLAYER 01 É PARÂMETRO DA FUNÇÃO
	//SIGNIFICA O ADVERSÁRIO FOI QUEM PONTUOU
	if (player == player01) {
		player02.score++;
	} else {
		player01.score++;
	}

	ballSpeedX = -ballSpeedX;
	ballPositionX = canvas.width/2;
	ballPositionY = canvas.height/2;
}