var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;
var ground;

var persons, person1, person2, energy;
var person1_Img, person2_Img, energyImg;

function preload(){
  back_img = loadImage("images/login3.jpg");
  ground = loadImage("images/ground2.jpg");
  person1_Img = loadAnimation("images/girl1.png", "images/girl2.png");
  person2_Img = loadAnimation("images/00.png", "images/11.png", "images/33.png", "images/44.png", "images/55.png", "images/66.png", "images/77.png");
  energyImg = loadImage("images/energy.png");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){

  if(gameState === 0){
    background(back_img);
  }

  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
    
  }
}
