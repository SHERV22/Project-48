var bgrunning, bgfight;
var charizard, charizardImg;
var gengar, gengarImg;
var articuno, articunoImg;
var moltres, moltresImg;
var zapdos, zapdosImg;
var hooh, hoohImg;
var mewtwo, mewtwoImg;
var mew, mewImg;
var zekrom, zekromImg;
var reshiram, reshiramImg;
var deoxys, deoxysImg
var pokeball, pokeballImg
var retry, retryImg;
var heart, heartImg, blackheart, blackheartImg;
var fire, fireImg, fireground, firegroundImg, obstacle,obstaclesGroup, waterpuddleImg, hole, holeImg;
var retry, retrys;
var enemy, enemyweaponImg, enemyweapon;

var temp=0;
var gameState=1;


function preload(){
  bgfight = loadImage("images/dark_cloud.jpg");
  bgrunning = loadImage("images/volcano.jpg");
  charizardImg = loadImage("images/charizard.png");
  gengarImg = loadImage("images/gengar.png");
  deoxysImg = loadImage("images/deoxys.png");
  mewImg = loadImage("images/mew.png");
  mewtwoImg = loadImage("images/mewtwo.png");
  hoohImg = loadImage("images/ho oh.png");
  moltresImg = loadImage("images/moltres.png");
  articunoImg = loadImage("images/articuno.png");
  zapdosImg = loadImage("images/zapdos.png");
  zekromImg = loadImage("images/zekrom.png");
  reshiramImg = loadImage("images/reshiram.png");
  firegroundImg = loadImage("images/fireground.png");
  waterpuddleImg = loadImage("images/waterpuddle.png");
  retry = loadImage("images/retry.png");
  enemyweaponImg = loadImage("images/enemyweapon.png");
  fireImg = loadImage("images/fire.png");

}

function setup() {
  createCanvas(displayWidth, displayHeight-120);
  fireground=createSprite(displayWidth/2, displayHeight-150, displayWidth, 30);
  fireground.addImage(firegroundImg);
  
  charizard=createSprite(180, displayHeight-350, 100, 50);
  charizard.addImage(charizardImg);
  charizard.scale=0.2;
  charizard.debug=true;
  charizard.setCollider("circle",0,0,height-100);
  
  retrys=createSprite(displayWidth/2,displayHeight/2,50,50);
  retrys.addImage(retry);
  retrys.visible=false;

  obstaclesGroup=new Group();
}

function draw() {
    if(gameState === 1){
        background(bgrunning);
        retrys.visible=false;
        charizard.visible=true;
        /*if(keyDown("right")){
          fireground.x=fireground.x-5;
          //obstacle.x=obstacle.x-5;
        }*/
        fireground.velocityX=-10;
        
        if(fireground.x<displayWidth/3){
            fireground.x=displayWidth/2;
        }
        console.log(charizard.y);
        if(keyDown("space")&& charizard.y>450){
          charizard.velocityY=-20;
        }
        //gravity
        charizard.velocityY=charizard.velocityY+0.8;
        camera.position.x=charizard.x+500;
        camera.position.y=fireground.y-350;
        spawnObstacle();
        if(obstaclesGroup.isTouching(charizard)){
          gameState=3;
          charizard.visible=false;
          //charizard.destroy();
        }

        if(temp===0  && frameCount%100===0){
          temp=1;
          gameState=2;
          spawnEnemy();
        }
    }

    if(gameState === 2){
      background(bgfight);
      fireground.velocityX=-10;
        
      if(fireground.x<displayWidth/3){
        fireground.x=displayWidth/2;
      }
      enemy.collide(fireground);
      if(enemy.y>displayHeight/2) {
        bullets();
      }
      if(keyWentDown("f")){
        fire=createSprite(50,50,50,50);
        fire.x=charizard.x+50;
        fire.y=charizard.y;
        fire.addImage(fireImg);
        fire.scale=0.1;
        fire.velocityX=6;
      }
      
    }
    if(gameState===3){
      background(bgrunning);
      retrys.visible=true;
      fireground.velocityX=0;
      obstaclesGroup.setVelocityXEach(0);
      if(mousePressedOver(retrys)){
        gameState=1;
      }
    }
    charizard.collide(fireground);
  drawSprites();

}
function spawnObstacle(){
  if(frameCount % 60 === 0) {
    obstacle = createSprite(camera.x+width/2,displayHeight-150,10,40);
    obstacle.addImage(waterpuddleImg);
    //obstacle.debug = true;
    //obstacle.velocityX = -(6 + 3*score/100);
    obstacle.velocityX =-10;
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function spawnEnemy(){
  enemy=createSprite(displayWidth-250,0,50,50);
  enemy.addImage(gengarImg);
  enemy.scale=0.3;
  enemy.velocityY=10;
  
}
function bullets(){
  background(bgfight);
  if(frameCount%100===0){
  enemyweapon=createSprite(100,100,50,50);
  enemyweapon.x=enemy.x-50;
  enemyweapon.y=enemy.y;
  enemyweapon.addImage(enemyweaponImg);
  enemyweapon.scale=0.1;
  enemyweapon.velocityX=-5;
  }
}