var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;

  ghost = createSprite(200, 200, 10, 10);
  ghost.scale = 0.4;
  ghost.addImage("ghost", ghostImg);

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw() {
  background(200);
  if (gameState === "play") {
    if (keyDown("right_arrow")) {
      ghost.x = ghost.x + 3;
    }

    if (keyDown("left_arrow")) {
      ghost.x = ghost.x - 3;
    }

    if (keyDown("space")) {
      ghost.velocityY = -10;
    }

    ghost.velocityY = ghost.velocityY + 0.8;
    if (tower.y > 400) {
      tower.y = 300
    }
    spawnDoors();

    if (climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0
    }
    if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
      gameState = "end"
    }
  }




  drawSprites();
  if (gameState === "end") {
    fill("red")
    textSize(30);
    text("Game Over", 230, 250)
  }
}

function spawnDoors() {
  if (frameCount % 200 === 0) {
    var door = createSprite(200, -50);
    var invisibleBlock = createSprite(200, 15);
    var climber = createSprite(200, 10);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;


    door.x = Math.round(random(120, 400));
    climber.x = door.x;
    invisibleBlock.x = door.x;

    door.addImage(doorImg);
    climber.addImage(climberImg);

    door.velocityY = 2;
    climber.velocityY = 2;
    invisibleBlock.velocityY = 2;

    ghost.depth = door.depth;
    ghost.depth += 1;

    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    doorsGroup.add(door);
    invisibleBlock.debug = false;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);

  }
}