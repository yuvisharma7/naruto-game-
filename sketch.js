var bg, bgimg;
var logo, logoimg, gameover, gameoverimg, restart, restartimg, start, startimg;
var obs1, obs2, obs3, obs4, obs5, obs6, obs1img, obs2img, obs3img, obs4img, obs5img, obs6img;
var naruto, narutoimg;
var gameState = PLAY;
var PLAY=0;
var END= 1;
var score= 0;

function preload(){
bgimg= loadImage("bg.jpg");
logoimg = loadImage("logo.png");
gameoverimg= loadImage("gameover.jpg");
restartimg= loadImage("restart.png");
startimg= loadImage("start.png");
obs1img = loadImage("fire.png");
obs2img = loadImage("lightning.png");
obs3img = loadImage("orochimaru.png");
obs4img = loadImage("water.png");
obs5img = loadImage("wind.png");
obs6img = loadImage("madara.png");
narutoimg= loadAnimation("natuto2.png");
}

function setup(){
createCanvas(1200,600);
score=0;
bg= createSprite(200,100,1200,600); 
bg.addImage (bgimg);
bg.x=bg.width/2;
bg.velocityX = -10;

naruto= createSprite(100,520,20,80);
naruto.addAnimation("running",narutoimg);
naruto.scale= 0.4;
naruto.setCollider("circle",0,0,80); 
naruto.debug=false;

ground=createSprite(500,520,1200,10);
ground.x=ground.width/2;
ground.velocityX=-6;
ground.visible=false;


logo= createSprite(600,250,100,50);
logo.addImage(logoimg);
logo.scale=0.7;

gameover= createSprite(600,200,20,20);
gameover.addImage(gameoverimg);
gameover.scale=0.2;
gameover.visible=false 

restart = createSprite(600,400,20,20);
restart.addImage(restartimg);
restart.scale=0.5;
restart.visible=false;

start= createSprite(600,400,20,20);
start.addImage(startimg);
start.scale=0.2;
text("START",600,500);

obsGroup= new Group();


}


function draw(){
background("Black");
textSize(20);
fill("Orange");
text("SCORE: "+score,900,50);    
if(mousePressedOver(start)){
gameState=PLAY;
naruto.velocityY=-25;
bg.velocityX=-20;
start.visible= false;
logo.visible=false;

}
if(bg.x<0){
    bg.x=bg.width/2;
    
    }
    if(ground.x<0){
        ground.x=ground.width/2;
        
        }

if(gameState===PLAY){
score=score+Math.round(getFrameRate()/60);
    ground.velocityX=-(6+3*score/100);
if(keyDown("space")&& naruto.y>=400){
        naruto.velocityY= -25;

    }
}
naruto.velocityY=naruto.velocityY+2.1;
naruto.velocityX=0;
bg.velocityX=-7;
obstacles();
if(naruto.isTouching(obsGroup)){
    gameState=END;
}

else if(gameState===END){
gameover.visible=true;
restart.visible=true;
naruto.velocityX=0;
naruto.velocityY=0;
bg.velocityX=0;
naruto.x=100;
naruto.y=480;

}
naruto.collide(ground);

if(mousePressedOver(restart)){
    reset();
}

drawSprites();
}
function reset(){
gameState=PLAY;
gameover.visible=false;
restart.visible=false;
obsGroup.destroyEach();
score=0;

}


function obstacles(){
if(frameCount%80===0){
    obstacle=createSprite(720,520,50,50);
    obstacle.velocityX= -10;
    obstacle.scale=0.5;
    var rand= Math.round(random(1,6));
    switch(rand){
        case 1: obstacle.addImage(obs1img);
        obstacle.scale=0.3;
        break;
        case 2: obstacle.addImage(obs2img);
        obstacle.scale=0.3;
        break;
        case  3: obstacle.addImage(obs3img);
        obstacle.scale=0.25;
        break;
        case 4: obstacle.addImage(obs4img);
        break;
        case 5: obstacle.addImage(obs5img);
        obstacle.scale= 0.35;
        break;
        case 6: obstacle.addImage(obs6img);
        obstacle.scale=0.8;
        break;
  default:break;
    }
obstacle.lifetime = 160;
obsGroup.add(obstacle);
}



}