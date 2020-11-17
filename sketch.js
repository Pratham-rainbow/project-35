//Pratham Agarwal.
//Virtual pet-1

var dog, happyDog, dogImg, database, foodS, foodStock;

function preload(){
	dogImg = loadImage("images/dogImg.png");
	happyDog = loadImage("images/dogImg1.png");
}

function setup() {
	database = firebase.database();

	createCanvas(700, 500);

	dog = createSprite(width/2, height/2+100);
	dog.addImage(dogImg);
	dog.scale = 0.2;

  foodStock = database.ref("Food");
	foodStock.on("value", readStock);
}


function draw() {
	background(46, 139, 87);

	if(keyWentDown(UP_ARROW)){
		writeStock(foodStock);
		dog.addImage(happyDog);
	}

  drawSprites();

  push();
  textSize(30);
	fill("yellow");
	text("Press  'UP'  arrow key to feed tommy", 110, 80);
	pop();

  fill(255);
	textSize(25);
	text("foodStock: " + foodStock, 250, height/2-50);
}

function readStock(data){
	foodStock = data.val();
}

function writeStock(x){
	if(x<=0){
		x = 0;
	} else {
		x = x - 1;
	}
	database.ref("/").set({
		"Food":x
	})
}
