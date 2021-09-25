var score =0;
var gun,bluebubble,redbubble, bullet, backBoard;
var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;
var redBubbleGroup, redBubbleGroup, bulletGroup;

var life =3;
var score=0;
var gameState=1

function preload(){
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg= loadImage("back.jpg")
}
function setup() {
  createCanvas(800, 800);

  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg)
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2
  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup(); 
  
  heading = createElement("h1");
  scoreboard = createElement("h1");
  
  
}

function draw() {
  background("#BDA297");

  //display Score and number of lifes
  scoreboard.html("score:"+ score);
  scoreboard.style('color:red');
  scoreboard.position(width-100,20);

  heading.html("life:" + life );
  heading.style('color:blue');
  heading.position(width-100,50);

  

  if(gameState===1){
    gun.y=mouseY 

    if(keyDown("space")) {
      shootbullet();
    }

    if(frameCount % 80 ===0) {
      drawbBubble();
    }

    if(frameCount % 150 ===0) {
      drawrBubble();
    }

    if (blueBubbleGroup.collide(backBoard)){
       handleGameover(blueBubbleGroup);
       } 
       
    if (redBubbleGroup.collide(backBoard)) {
       handleGameover(redBubbleGroup);
      }

    if(blueBubbleGroup.collide(bulletGroup)) {
      handleBubbleCollision(blueBubbleGroup);

    }

    if(redBubbleGroup.collide(bulletGroup)) {
      handleBubbleCollision(redBubbleGroup);
    }
    
    

    
    drawSprites();
  }
     
}

function shootbullet() {
  bullet= createSprite(150, width/2, 50,20);
  bullet.y= gun.y-20;
  bullet.addImage(bulletImg);
  bullet.scale=0.12;
  bullet.velocityX= 7;
  bullet.lifetime = 300;
  bulletGroup.add(bullet);

}

function drawbBubble() {

  bubble = createSprite(800,random(20,780), 30,30);
  bubble.velocityX = -5;
  bubble.addImage(blueBubbleImg);
  bubble.scale = 0.10;
  bubble.lifetime = 300;
  blueBubbleGroup.add(bubble);

}

function drawrBubble() {
  Rbubble = createSprite(800,random(300,500), 30,30);
  Rbubble.velocityX = -7;
  Rbubble.addImage(redBubbleImg);
  Rbubble.scale = 0.10;
  Rbubble.lifetime = 300;
  redBubbleGroup.add(Rbubble);
  
}

function handleBubbleCollision(bubbleGroup){
   if (life > 0) {
      score=score+1;
   }
    blast= createSprite(bullet.x+60, bullet.y, 50,50);
    blast.addImage(blastImg);
    blast.scale=0.3;
    blast.life=20;
    bulletGroup.destroyEach();
    bubbleGroup.destroyEach(); 
    
  }

  function handleGameover(bubbleGroup){
     life=life-1;
     bubbleGroup.destroyEach();
     if (life === 0) {
      gameState=2 
      swal({
       title: `Game Over`,
       text: "Oops you lost the game....!!!",
       text: "Your Score is " + score,
       imageUrl: "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
       imageSize: "100x100",
       confirmButtonText: "Thanks For Playing" 
       });
      }
    }





