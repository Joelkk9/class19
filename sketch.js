var PLAY = 1;
var END = 0;

var gameState = "play";
var clouds,cloudsAnimation;
var background,backgroundImg;
var sun,sunImg;
var boy,boyAnimation;

var score;

function preload(){
    cloudsAnimation = loadAnimation("cloud_1.png","cloud_2.png","cloud_3.png","cloud_4.png","cloud_6.png","cloud_7.png","cloud_8.png","cloud_9.png");
    boyAnimation = loadAnimation("boywalking_1.png","boywalking_2.png","boywalking_3.png","boywalking_4.png","boywalking_5.png","boywalking_6.png","boywalking_7.png","boywalking_8.png","boywalking_9.png","boywalking_10.png","boywalking_11.png","boywalking_12.png");
    tyreImg = loadImage("tyre.jpg");
    backgroundImg = loadImage("background image.jpg");
    sunImg = loadImage ("sun.jpg");
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    
    
    
    background_1 = createSprite(200,180,400,20);
    background_1.addImage(backgroundImg);
    background_1.x = background_1.width /2;
    background_1.scale = 4;

    boy = createSprite(50,200,20,50);
    boy.addAnimation("boy",boyAnimation);
    boy.scale = 0.9;
    
    sun = createSprite (100,90,20,20);
    sun.addImage(sunImg);
    sun.scale = 0.5;
    
    invisibleBackground = createSprite(0,400,800,10);
    invisibleBackground.visible = false;
    
    tyreGroup = createGroup();
    cloudsGroup = createGroup();
    
    console.log("Hello" + 5);
    
    boy.setCollider("circle",0,0,40);
    boy.debug = true;
    
    score = 0
  }
  
  function draw() {
    background(180);
    text("Score: "+ score, 960,50);
    
    
    console.log("this is ",gameState)
    
    
    if(gameState === "play"){
      background_1.velocityX = -4;
      score = score + Math.round(frameCount/60);
      
      if (background_1.x < 0){
        background_1.x = background_1.width/8;
      }
      
      if(keyDown("space")&& boy.y >=100) {
          boy.velocityY = -13;
      }
      
      boy.velocityY = boy.velocityY + 0.8

      spawnClouds();
    
      spawnObstacles();
      
      if(tyreGroup.isTouching(boy)){
          gameState = "end";
      }
    }
     else if (gameState === "end") {
        background_1.velocityX = 0;
       
       tyreGroup.setVelocityXEach(0);
       cloudsGroup.setVelocityXEach(0);
  
       tyreGroup.setLifetimeEach (-1) ; 
       cloudsGroup.setLifetimeEach (-1) ;  
       
       text("Game Over",960,300);
      
       

       tyreGroup.destroyEach(tyre);
       cloudsGroup.destroyEach(cloud);
       sun.destroy();
       boy.destroy();
     }
    
  
    boy.collide(invisibleBackground);
    
    
    
    drawSprites();
  }
  
  function spawnObstacles(){
   if (frameCount % 60 === 0){
     var tyre = createSprite(windowWidth,365,10,40);
     tyre.addImage(tyreImg);
     tyre.velocityX = -10;
           
      tyre.scale = 0.15;
      tyre.lifetime = 400;
    
      tyreGroup.add(tyre);
   }
  }
  
  function spawnClouds() {
     if (frameCount % 60 === 0) {
      clouds = createSprite(width,100,40,10);
      clouds.y = Math.round(random(10,60));
      clouds.addAnimation("cloud",cloudsAnimation);
      clouds.scale = 0.5;
      clouds.velocityX = -3;
      
      clouds.lifetime = 1000;

      clouds.depth = boy.depth;
      boy.depth = boy.depth + 1;
      
      cloudsGroup.add(clouds);
      }
  }