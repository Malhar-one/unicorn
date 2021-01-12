var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var PLAY = 1 ;
var END = 0;
var GameState = PLAY;
var gameover,gameoverimage
var restart,restartimage


var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var backgr


function preload(){
  trex_running = loadAnimation("unicorn.png","unicorn.png","unicorn.png");
  trex_collided = loadAnimation("unicorn.png");
  
  groundImage = loadImage("Untitled.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("train.png");
  obstacle2 = loadImage("train.png");
  obstacle3 = loadImage("train.png");
  obstacle4 = loadImage("train.png");
  obstacle5 = loadImage("train.png");
  obstacle6 = loadImage("train.png");
  gameoverimage = loadImage("unnamed.png");
  restartimage = loadImage("restart.png");
  backgr = loadImage("background.jpg")
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  gameover = createSprite(300,100);
  gameover.addImage(gameoverimage);
  
  restart = createSprite(300,150);
  restart.addImage(restartimage);
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  
}

function draw() {
  background(backgr);
  
  fill("black")
  
  text("Score: "+ score, 500,50);
  
  if(GameState=== PLAY){
     ground.velocityX = -(4+5*score / 100);
    score = score + Math.round(getFrameRate()/60);
      if(keyDown("space")) {
    trex.velocityY = -10;        
  }
    
  trex.velocityY = trex.velocityY + 0.8
     if (ground.x < 0){
    ground.x = ground.width/2;
  }
     spawnClouds();
     gameover.visible = false;
    restart.visible = false;
  spawnObstacles();
    if(obstaclesGroup.isTouching(trex)){
       GameState = END;
       }
    
     }
  else if(GameState === END){
trex.changeAnimation("collided" , trex_collided)
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)
    obstaclesGroup.setLifetimeEach(-1)
    cloudsGroup.setLifetimeEach(-1);
    gameover.visible = true;
    restart.visible = true;
    if(mousePressedOver(restart)){
      reset();
       
       }
    
          }

  
  
 
  
  trex.collide(invisibleGround);

  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function reset(){
  GameState = PLAY;
  score = 0;
  gameover.visible = false;
    restart.visible = false;
  cloudsGroup.destroyEach();
  obstaclesGroup.destroyEach();
  trex.changeAnimation("running" , trex_running)
  
}





function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -(4 + 5*score/100);
    
    
    
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}