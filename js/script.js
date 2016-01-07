var canvas;
var cContext;

var ballPositionX = 10;
var ballPositionY = 10;
var ballSpeedX = 6;
var ballSpeedY = 6;

var player01PositionY = 250;
var player02PositionY = 250;

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
		player01PositionY = mousePosition.y - (PLAYER_HEIGHT/2);
	});

}

function updatePositions () {
	ballPositionX = ballPositionX + ballSpeedX;
	ballPositionY = ballPositionY + ballSpeedY;

	if (ballPositionX < 0) {
		checkCollision(player01PositionY);
	}
	if (ballPositionX > canvas.width) {
		checkCollision(player02PositionY);
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
	drawRect(0, player01PositionY, PLAYER_WIDTH, PLAYER_HEIGHT, "white");
	drawRect(canvas.width-PLAYER_WIDTH, player02PositionY, PLAYER_WIDTH, PLAYER_HEIGHT, "white");
	drawRect(ballPositionX, ballPositionY, BALL_DIMENSIONS, BALL_DIMENSIONS, "white");
}

function drawRect (customLeft, customTop, customWidth, customHeight, customColor) {
	cContext.fillStyle = customColor;
	cContext.fillRect(customLeft, customTop, customWidth, customHeight);
}

function checkCollision (playerPosition) {
	if ((ballPositionY + (BALL_DIMENSIONS/2)) > playerPosition && 
		(ballPositionY + (BALL_DIMENSIONS/2)) < (playerPosition + PLAYER_HEIGHT)) {

		ballSpeedX = -ballSpeedX;

	} else {
		playerScored();
	}
}

function playerScored () {
	ballSpeedX = -ballSpeedX;
	ballPositionX = canvas.width/2;
	ballPositionY = canvas.height/2;
}