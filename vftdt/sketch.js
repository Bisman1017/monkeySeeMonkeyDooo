var PLAY = 1;
var END = 0;
var game

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1;

var count;


function preload(){
  ground1 = loadImage("jungle.jpg");
  cloudImage = loadImage("banana.png");
  trex_running = loadImage("Monkey_01.png");
  obstacle1 = loadImage("stone.png");
}

function setup() {
  createCanvas(400, 400);
  
  ground = createSprite(200,200,400,400);
  ground.addAnimation("running", ground1);
  
  trex = createSprite(100,350,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.1;
  
  invisibleGround = createSprite(20,390,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  count = 0;
}

function draw() {
  text("Score: "+ count, 200,50);
  
   if(keyDown("space")) { 
    trex.velocityY = -12;
  }
      if (obstaclesGroup.isTouching(trex)) {
      trex.destroy()
      obstaclesGroup.destroyEach()
      cloudsGroup.destroyEach()
      }
  trex.velocityY = trex.velocityY + 0.8
  
  trex.collide(invisibleGround);
  spawnClouds();
  spawnObstacles();
  
  if (cloudsGroup.isTouching(trex)) {
         count = count + 1
         cloudsGroup.destroyEach()
          var v = ("Score: "+count)
          console.log(v)
         
        }
  
  drawSprites();
   stroke("white");
      textSize(20);
      fill("white");  
      text("Score: "+ count, 50,50);
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 150 === 0) {
    var cloud = createSprite(600,120,20,20);
    cloud.y = Math.round(random(160,240));
    cloud.addImage(cloudImage);
    cloud.scale = 0.1;
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

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,370,40,40);
    obstacle.velocityX = -4;    
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    obstacle.addAnimation("stone.png", obstacle1);
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);    
  }
}