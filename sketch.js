var starImg, fairyImg, bgImg;
var fairy , fairyVoice;
var star, starBody;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

function preload(){
	starImg = loadImage("star.png");
	fairyImg = loadAnimation("fairyImage1.png","fairyImage2.png");
	bgImg = loadImage("starNight.png");
	fairyVoice = loadSound("JoyMusic.mp3");

}

function setup() {
	createCanvas(800, 750);

	fairy = createSprite(130, 520);
	fairy.addAnimation("fairyflying",fairyImg);  
	fairy.scale =0.25;

	star = createSprite(650,30,2.5,2.5);
	star.addImage(starImg);
	star.scale = 0.2;

	engine = Engine.create();
	world = engine.world;

	var starBodyProper={
		restitution:0.5,
		desnsity:0.01,
		isStatic:true
	}

	starBody = Bodies.circle(650 , 30 , 5 , starBodyProper);
	World.add(world, starBody);

	fairy.setCollider("rectangle",0,0,1200,1200);

	fairyVoice.play();

	Engine.run(engine);
	console.log(starBody)
}


function draw() {
	
  console.log("fairy's X Position: "+fairy.x+"   Check this value for the star to make it land on hand");

  background(bgImg);
  Engine.update(engine);

  star.x=starBody.position.x;
  star.y=starBody.position.y;

  keyPressed();

  

  if(starBody.position.y > 470){
	Matter.Body.setStatic(starBody,true);

	if(fairy.x===508||star.isTouching(fairy)){

	Matter.Body.setStatic(starBody,true);
	}else{
		starBody.position.y=30;
		starBody.position.x=650;	
	}
  }
  drawSprites();

  

}

function keyPressed() {
	if(keyDown("left")){
		fairy.x=fairy.x-6;
	}
	if(keyDown("right")){
		fairy.x=fairy.x+6;
	}
	if (keyDown(DOWN_ARROW)) {
		Matter.Body.setStatic(starBody,false); 
	}
}
