//VERIFICAR A CALIBRAGEM DO ADVERSÁRIO

var canvas;
var cContext;

var ballPositionX = 50;
var ballPositionY = 50;
var ballSpeedX = 10;
var ballSpeedY = 4;

var player01 = {
	name: "PLAYER O1",
	score : 0,
	positionY : 250
}
var player02 = {
	name: "PLAYER 02",
	score : 0,
	positionY : 250
}

var finishGame = false;
var winner = "";

const FRAMES_PER_SECOND = 30;
const BALL_DIMENSIONS = 15;
const PLAYER_WIDTH = 10;
const PLAYER_HEIGHT = 100;
const WINNING_SCORE = 1;

window.onload = function () {
	
	canvas = document.getElementById("gameCanvas");
	cContext = canvas.getContext("2d");
	
	setInterval(function(){
		if (finishGame) {
			drawEndScreen();
			return;
		} else {
			updatePositions();
			drawElements();
		}
	}, 1000/FRAMES_PER_SECOND);

	//CRIA O LISTENER DE MOVIMENTO DO MOUSE
	canvas.addEventListener("mousemove", function(evt) {
		var mousePosition = getMousePosition(evt);
		//POSICIONA O MOUSE NO MEIO DA BARRA DO JOGADOR
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
	cContext.font = "40px 'Press Start 2P'";
	cContext.fillText(player01.score, 130, 100);
	cContext.fillText(player02.score, canvas.width-160, 100);
}

function drawRect (customLeft, customTop, customWidth, customHeight, customColor) {
	cContext.fillStyle = customColor;
	cContext.fillRect(customLeft, customTop, customWidth, customHeight);
}

function getMousePosition (evt) {
	var gameRect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	//CALCULA A POSICAO DO MOUSE EM RELACAO À CAIXA DO JOGO
	var mouseX = evt.clientX - gameRect.left - root.scrollLeft;
	var mouseY = evt.clientY - gameRect.top - root.scrollTop;

	return { x: mouseX, y: mouseY }
}

function checkCollision (player) {
	if ((ballPositionY + (BALL_DIMENSIONS/2)) > player.positionY && 
		(ballPositionY + (BALL_DIMENSIONS/2)) < (player.positionY + PLAYER_HEIGHT)) {

		ballSpeedX = -ballSpeedX;
		//RECALCULA A VELOCIDADE DA BOLA NO EIXO Y
		//DE ACORDO COM A POSIÇÃO DE COLISÃO DELA COM A BARRA
		recalculateBallSpeedY(player);

	} else {
		playerScored(player);
	}
}

function recalculateBallSpeedY (player) {
	//VERIFICA ONDE (EM RELAÇÃO AO CENTRO DA BARRA) HOUVE A COLISÃO DA BOLA
	var ballCollision = ballPositionY - (player.positionY + (PLAYER_HEIGHT/2));

	ballSpeedY = ballCollision * 0.35;
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
		checkTheEndOfTheGame(player02);
	} else {
		player01.score++;
		checkTheEndOfTheGame(player01);
	}
}

function checkTheEndOfTheGame (player) {
	if (player.score >= WINNING_SCORE) {
		finishGame = true;
		winner = player.name;
	}
	//REPOSICIONA A BOLA NO CENTRO DA TELA
	ballSpeedX = -ballSpeedX;
	ballPositionX = canvas.width/2;
	ballPositionY = canvas.height/2;
}

function drawEndScreen () {
	drawRect(0, 0, canvas.width, canvas.height, "black");
	cContext.fillStyle = "white";
	cContext.textAlign = "center";
	cContext.font = "44px 'Press Start 2P'";
	cContext.fillText("FIM DE JOGO", canvas.width/2, 175);
	cContext.font = "20px 'Press Start 2P'";
	cContext.fillText("VITÓRIA DO " + winner + "!", canvas.width/2, 220);
	cContext.font = "16px 'Press Start 2P'";
	cContext.fillText("JOGAR NOVAMENTE", canvas.width/2, 380);
}