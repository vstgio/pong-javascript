var canvas;
var cContext;

var ballPositionX = 10;
var ballPositionY = 10;
var ballSpeedX = 10;
var ballSpeedY = 10;

var player01PositionY = 250;

const FRAMES_PER_SECOND = 30;
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
		player01PositionY = mousePosition.y - (PLAYER_HEIGHT/2);
	});

}

function updatePositions () {
	ballPositionX = ballPositionX + ballSpeedX;
	ballPositionY = ballPositionY + ballSpeedY;

	if (ballPositionX < 0) {
		ballSpeedX = -ballSpeedX;
	}
	if (ballPositionX > canvas.width) {
		ballSpeedX = -ballSpeedX;
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
	drawRect(5, player01PositionY, 10, PLAYER_HEIGHT, "white");
	drawRect(ballPositionX, ballPositionY, 14, 14, "red");
}

function drawRect (customLeft, customTop, customWidth, customHeight, customColor) {
	cContext.fillStyle = customColor;
	cContext.fillRect(customLeft, customTop, customWidth, customHeight);
}