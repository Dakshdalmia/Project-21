var space ,spaceImg;
var meteor , meteorImg , meteorGroup;
var rocket , rocketImg;
var gameState = "PLAY";
var invisible1,invisible2 , score;

function preload(){
spaceImg = loadImage("Background.png")
meteorImg = loadImage("meteor.png")
rocketImg = loadImage("rocket.png")
}

function setup() {
 createCanvas(600,350);
 space = createSprite(300,175);
 space.addImage("space",spaceImg);
 space.scale=1.5
 space.velocityX = -4;

invisible1 = createSprite(300,0,610,20);
invisible2 = createSprite(300,350,610,20);
invisible1.visible = false;
invisible2.visible = false;

meteorGroup = new Group();

 rocket = createSprite(90,175,20,20);
 rocket.addImage("rocket",rocketImg);
 rocket.scale=0.3
 rocket.setCollider("rectangle",0,0,420,150);

 score = 0;
}

function draw() {
    background(0)

    if(space.x < 50){
 space.x = 300
 }

 if(gameState=="PLAY"){

 score = score + Math.round(getFrameRate()/60)

     if(keyDown("up")){
         rocket.y = rocket.y -5
     }
     
     if(keyDown("down")){
         rocket.y = rocket.y +5
     }

    spawnMeteors();

if(meteorGroup.isTouching(rocket)){
    rocket.destroy();
    meteorGroup.destroyEach();
    gameState = "END"
}
 }

rocket.collide(invisible1);
rocket.collide(invisible2);

 drawSprites();

textSize(20)
 text("Score: "+score,450,50)

 if(gameState==="END"){
    space.velocityX = 0
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("GAME OVER",300,175)
}
}


function spawnMeteors(){
    if(frameCount % 180 === 0){
    meteor = createSprite(640,175);

    meteor.y = Math.round(random(20,320));
    meteor.addImage(meteorImg);
    meteor.scale = 0.7;

    meteor.velocityX = -6;
    meteor.lifetime = 175;

    meteorGroup.add(meteor);

    meteor.depth = rocket.depth;
    rocket.depth = rocket.depth + 1;
    
    meteor.setCollider("rectangle",0,0,200,150);
}
}



















