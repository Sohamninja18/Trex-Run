var trex, trex_running, trex_collided;
var ground, invisibleGround, groundimg;
var cactusgrp, cloudgrp;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var cloudimg;
var score = 0;
var gamestate= "play";
var GO,GOimg;
var reset,resetimg;


function preload(){
  trex_running =loadAnimation("trex1.png","trex3.png","trex4.png");
  
  trex_collided = loadImage("trex_collided.png");
  
  groundimg = loadImage("ground2.png");
  
  obstacle1= loadImage("obstacle1.png");
  obstacle2= loadImage("obstacle2.png");
  obstacle3= loadImage("obstacle3.png");
  obstacle4= loadImage("obstacle4.png");
  obstacle5= loadImage("obstacle5.png");
  obstacle6= loadImage("obstacle6.png");
  
  cloudimg= loadImage("cloud.png");
  
  GOimg = loadImage("gameOver.png");
  
  resetimg= loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundimg);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
   cactusgrp = createGroup();
 cloudgrp = createGroup();
  
 reset = createSprite(300,150,10,30);
   reset.scale = 0.6;
  reset.addImage(resetimg);

  GO = createSprite(300,100,10,30);
   GO.scale = 0.75;
   GO.addImage(GOimg);
   GO.visible= false;
   
  
}

function draw() {
  background(220);
  
  if(gamestate==="play")
{
fill("black");
ground.velocityX = -10;
 score =score+Math.round(getFrameRate()/60);
 var quo = Math.round(score/200);
 
 if(quo % 2 === 0)
 {
   background("white");
 fill("black");
 textSize(20);
text("Score: "+score , 500, 50);

   
 }
 if(quo % 2 != 0)
 {
   background("black");
   fill("white");
 textSize(20);
text("Score: "+score , 500, 50);
 }
 

 //To reset the path.
 if(ground.x<0){
   ground.x = ground.width/2;
 }
 
 //jump when the space key is pressed
  if(trex.y >= 159 && keyDown("space")){
    trex.velocityY = -13 ;
    trex.pause();  
  }
  
  trex.play();
  trex.setCollider("circle",0,0,40);
  
   
  //add gravity
  trex.velocityY = trex.velocityY + 1; 
  
  
  //stop trex from falling down
  trex.collide(invisibleGround);

spawnClouds();
spawnCactus();
  
  if(cactusgrp.isTouching(trex))
  {
    gamestate = "end";
}
  
  reset.visible= false;
}
  
  if(gamestate==="end")
 {
    ground.velocityX = 0;
    
    cactusgrp.setVelocityXEach(0);
    cloudgrp.setVelocityXEach(0);
  
  trex.changeAnimation("collided",trex_collided);
   trex.velocityY = 0;
   
  
   GO.visible = true;
   reset.visible= true;
 }
 
if(mousePressedOver(reset))
{
gamestate = "play";
reset.visible = false;
GO.visible = false;

cactusgrp.destroyEach();
cloudgrp.destroyEach();
trex.changeAnimation("trex",trex_running);
score=0;
}
  
  drawSprites();
}

function spawnClouds()
{
  if(frameCount % 60 === 0)
{
    var cloud = createSprite(600,120,40,10);
  cloud.y= Math.round(random(80,120));
   // console.log(sprite.lifetime);
  cloud.addImage(cloudimg);
  cloud.scale = 0.7;
  cloud.velocityX = -3;
  cloud.depth = trex.depth;
  trex.depth = trex.depth +1;
  cloud.lifetime = 200
  cloudgrp.add(cloud);
}
}
  
function spawnCactus()
{
  if(frameCount % 60 === 0)
  {
    
  var cactus = createSprite(600,165,10,40);
  var rand= Math.round(random(1,6));
    switch(rand){
      case 1: cactus.addImage(obstacle1);
        break
      case 2: cactus.addImage(obstacle2);
        break
      case 3: cactus.addImage(obstacle3);
        break
      case 4: cactus.addImage(obstacle4);
        break
      case 5: cactus.addImage(obstacle5);
        break
      case 6: cactus.addImage(obstacle6);
        break
        default: break;
    }
  cactus.scale = 0.5;
  cactus.velocityX = -(10+score/100);
  cactus.lifetime = ground.width / cactus.velocityX;
  cactusgrp.add(cactus);
  }
}
  



