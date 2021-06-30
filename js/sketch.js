//creating the gameStates
var PLAY=1;
var END=0;
var gameState =1;

//creating the variables
var spiderman, spiderman_running, spiderman_collided, obstacle1, obstacle2, obstacle3, coinImage, gameover,gameOver, restart, Restart, ground, groundImage, coinGroup, obstaclesGroup, coinCollectedSound, collidedSound, leftRightSound, edges;

//creating the spiderman array
Spidy = [spiderman];

//creating lives
var life;

//creating the score
var score;

//creating the function preload
function preload(){
  
  //loading the animation of spiderman
spiderman_running=loadAnimation("images/spiderman1.png", "images/spiderman2.png", "images/spiderman3.png");  
  
  //loading the collided animation of spiderman
  spiderman_collided=loadAnimation("images/spidermanfallen.png");
  
  //loading the image of ground
  groundImage=loadImage("images/ground.png");  
  
  //loading the image of the obstacles
  obstacle1=loadImage("images/obstacle1.png");
   obstacle2=loadImage("images/obstacle2.png");
  obstacle3=loadImage("images/obstacle3.png");
  
  //loading the image of the coins
  coinImage=loadImage("images/coin.png");
  
  //loading the image of gameover
  gameOver=loadImage("images/gameover.png");
  
  //loading the image of restart
  Restart=loadImage("images/restart.png");
  
  //loading the sounds
  coinCollectedSound=loadSound("sounds/coinCollected.wav");
  collidedSound=loadSound("sounds/collided.wav");
  leftRightSound=loadSound("sounds/leftRight.wav");
}

//creating the function setup
function setup(){
  //creating the canvas
 createCanvas(displayWidth-20, displayHeight-140);
  
//assigning a value to score
  score=0;
  
  //assigning a value to life
  life=5;
  
  //creating spiderman
  spiderman=createSprite(displayWidth/2, displayHeight/2+200, 10, 10);
  
  //adding the animation of spiderman
  spiderman.addAnimation("running", spiderman_running);
  
  //creating ground
  ground=createSprite(displayWidth, displayHeight, 10, 10);
  
  //adding the image of ground
  ground.addImage(groundImage);
  
  //adding the scale of the ground
  ground.scale=10.2;
  
  //giving a velocity to the ground
  ground.velocityY=-4;
  
  //creating gameover
  gameover=createSprite(displayWidth/2-10, displayHeight/2-60, 10, 10);
  
  //adding the image of gameover
  gameover.addImage(gameOver);
  
  //adding the scale of gameover
  gameover.scale=0.4;
  
  //creating restart
  restart=createSprite(displayWidth/4+370, displayHeight/4+240, 10, 10);
  
  //adding the image of restart
  restart.addImage(Restart);
  
  //adding the scale of restart
  restart.scale=0.4;
  
  //creating the coinGroup
  coinGroup=new Group();
  
  //creating the obstaclesGroup
  obstaclesGroup=new Group();
    
  //logging the text which gives the player an idea of what to do
  console.log("Move the spiderman with right and left arrows and stay away from thanos and his obstacles!");
  
}

//creating the the function draw
function draw() {
  //giving the background colour
  background("white");
  
          //making the ground move properly
  if(ground.y<0){
    ground.y=ground.height/2;
  }
  
  //creating the gameState PLAY
  if(gameState===PLAY){

  //making the spiderman visible over the ground
  spiderman.depth=ground.depth+1;
  
  //making the velocity of the spiderman 0 so that it does not move automatically
  spiderman.velocityX=0;
  
    //making the gameover and restart not visible in gameState PLAY
    gameover.visible=false;
    restart.visible=false;
    
  //making the spiderman move side ways
  if(keyDown("right")){
    //moving the spiderman rightwards
    spiderman.velocityX=5;
    //playing the leftRightSound
    leftRightSound.play();
  }
  
  if(keyDown("left")){
    //moving the spiderman leftwards
    spiderman.velocityX=-5;
    //playing the leftRightSound
    leftRightSound.play();
  }
  
  //calling the function spawnObstacles
  spawnObstacles();
  
  //calling the spawnCoin function
  spawnCoin();
  
    //increasing the score if the coinGroup touches the spiderman and destroying the coin
    if(coinGroup.isTouching(spiderman)){
      //increasing the score
      score=score+1;
      //playing the coinCollectedSound
      coinCollectedSound.play();
      //destroying the coin
      coinGroup[0].destroy();
}
    
    //going to the gameState END
    if(obstaclesGroup.isTouching(spiderman)){
      //decreasing the life by 1
      life=life-1;
      //playing the collidedSound
      collidedSound.play();
      //making the gameState from PLAY to END
      gameState=END;
      //adding the collided animation of the spiderman
      spiderman.addAnimation("collided", spiderman_collided);
      //changing the animation of the spiderman from running to collided
      spiderman.changeAnimation("collided", spiderman_collided);
    }
  }
  
  //creating the gameState END
  else if(gameState===END){
    //if no lives remain then this will happen
     if(life<1){
       //making the spiderman not visible
         spiderman.visible=false;
       //destroying the obstaclesGroup
         obstaclesGroup.destroyEach();
        //making the gameover not visible
         gameOver.visible=false;
        //making the restart not visible
         restart.visible=false;
       //destroying the coinGroup
         coinGroup.destroyEach();
       //removing the ground
       ground.remove();
       ////giving the properties to the the texts
        textSize(20);
        fill(10);
       //telling the user of what to do next
           text("You have lost all your lives" , 200, 280);
        text("Press 'Ctrl + R' to restart", 200, 310);
  }
    //if 1 or more lives remain then this will happen
    if(life>0){
      //making the gameover visible
      gameover.visible=true;
      //making the restart visible
      restart.visible=true;
    //setting the velocity of each game object to 0
    ground.velocityY = 0;
    spiderman.velocityX = 0;
    obstaclesGroup.setVelocityYEach(0);
    coinGroup.setVelocityYEach(0);
         
    //setting the lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    coinGroup.setLifetimeEach(-1);
      
        if(mousePressedOver(restart)) {
      if(life>0){
      reset();  
}
    }
  }
  }
  //making the sprites visible
  drawSprites();
  
  //giving the properties to the the texts
textSize(20);
  fill(10);
  
      //giving the player an idea of what to do
  text("Move the spiderman with right and left arrows and stay away from thanos and his obstacles!", displayWidth/2-450, displayHeight/2-400);
  
    //giving the properties to the the texts
  textSize(25);
  fill(10);
  
  //making the score visible
  text("Score: " + score, displayWidth/2-80, displayHeight/2-370)
  
    //making the lives visible
  text("Life: "+ life , displayWidth/2-70, displayHeight/2-340);
  
}

//creating the function spawnObstacles
function spawnObstacles(){
  //making the obstacles visible after sometime
  if(frameCount%60===0){
    //creating the obstacles
    var obstacle=createSprite(Math.round(random(displayWidth/2-700, displayWidth/2+700)), 100, 10, 10);
    //giving a velocity to the obstacles and increasing it if the score is a multiple of 10
    obstacle.velocityY=(8 + 3*score/10);
    
    //giving a lifetime to the obstacles
    obstacle.lifetime=63;
    
  //generating random obstacles
    var rand=Math.round(random(1, 3));
    switch(rand){
      case 1: //adding the image of obstacle1
              obstacle.addImage(obstacle1);
             break;
             case 2: //adding the image of obstacle2
        obstacle.addImage(obstacle2);
        break;
        case 3: //adding the image of obstacle3
        obstacle.addImage(obstacle3);
        break;
        default: break;
    }
    
    //adding a scale to the obstacles
    obstacle.scale=0.4;
    
    //adding the obstacles to the obstaclesGroup
    obstaclesGroup.add(obstacle);
  }
}

//creating the function spawnCoin
function spawnCoin(){
  //making the coins appear after sometime
  if(frameCount%60===0){
    //creating the coins
    coin=createSprite(Math.round(random(displayWidth/2-700, displayWidth/2+700)), 100, 10, 10);
    
       //giving a velocity to the coins and increasing it if the score is a multiple of 5
    coin.velocityY=(7 + 2*score/5);
    
    //giving a velocity to the coins
    coin.lifetime=67;
    
    //adding the image of the coin
    coin.addImage(coinImage);
    
    //adding a scale to the coins
    coin.scale=0.3;
    
    //adding the coins to the coinGroup
    coinGroup.add(coin);
}
}

//creating the function reset
function reset(){
  //making the gameState from END to PLAY
  gameState = PLAY;
  
  //making the gameover and restart not visible
  gameOver.visible = false;
  restart.visible = false;
  
  //changing the animation of the spiderman from collided to running
  spiderman.changeAnimation("running", spiderman_running);
  
  //destroying the obstaclesGroup and coinGroup
    obstaclesGroup.destroyEach();
  coinGroup.destroyEach();
  
  //giving a velocity to the ground
  ground.velocityY=-4;
  
  spiderman.position.x=displayWidth/2;
  spiderman.position.y=displayHeight/2 + 200;
}