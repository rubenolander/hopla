document.addEventListener("DOMContentLoaded", (e) => {
  // initialize Matter.js

  const Engine = Matter.Engine;
  const World = Matter.World;
  const Body = Matter.Body;
  const Bodies = Matter.Bodies;
  const Events = Matter.Events;
  const Vector = Matter.Vector;
  const Composite = Matter.Composite;
  const Mouse = Matter.Mouse;
  const MouseConstraint = Matter.MouseConstraint;

  // Game window parameters
  const gameWindow = document.querySelector(".game");
  const gameWidth = gameWindow.offsetWidth;
  const gameHeight = gameWindow.offsetHeight;

  const engine = Engine.create();

  //get background and center it in the PIXI app view. Will be called later.
  function createBackground() {
    const background = PIXI.Sprite.from("../src/background.png");
    background.width = innerWidth / 1.01;
    background.x = gameWidth - background.width;
    background.height = gameHeight;

    app.stage.addChild(background);
  }

  const gameSprites = [
    {
      src: "../src/ostrichIdle.png",
      initialPosition: {
        x: gameWidth / 4,
        y: gameWidth + 5,
      },
      width: 30,
      height: 50,
    },
  ];

  const app = new PIXI.Application({
    autoResize: true,
    resizeTo: gameWindow,
  });

  const sceneFloor = Bodies.rectangle(
    200,
    gameWindow.height,
    gameWindow.width,
    200,
    { isStatic: true }
  );

  World.add(engine.world, [sceneFloor]);

  gameWindow.appendChild(app.view);
  createBackground();

  const playerOneIdle = PIXI.Texture.from(gameSprites[0].src);
  const playerOneLeft = PIXI.Texture.from("../src/ostrichLeft.png");
  const playerOneRight = PIXI.Texture.from("../src/ostrichRight.png");
  const playerOneJump = PIXI.Texture.from("../src/ostrichFlightlessBird.png");

  const playerOne = new PIXI.Sprite(playerOneIdle);
  const playerTwo = new PIXI.Sprite(playerOneRight);

  app.stage.addChild(playerOne, playerTwo);

  playerTwo.height = 50;
  playerTwo.width = 40;
  playerTwo.x = gameWidth / 3;
  playerTwo.y = playerOne.height = 50;
  playerOne.width = 40;
  playerOne.x = app.screen.width / 2;
  playerOne.y = app.screen.height - (playerOne.height + 5);
  //EventListeners för knapptryckningar.
  window.addEventListener("keydown", keysDown);
  window.addEventListener("keyup", keysUp);
  let keys = {};

  let movementKeyCodes = {
    P1Jump: 87,
    P1Left: 65,
    P1Right: 68,
    P2Jump: 38,
    P2Left: 37,
    P2Right: 39,
  };
  function keysDown(e) {
    keys[e.keyCode] = true;
  }

  function keysUp(e) {
    keys[e.keyCode] = false;
  }

  app.ticker.add(gameLoop);

  function gameLoop() {
    let isJumping = false;
    let isRunning = false;
    let isLeftTexture = false;
    //Jumps
    if (!isRunning && !isJumping) {
      playerOne.texture = playerOneIdle;
      playerTwo.texture = playerOneIdle;
    }
    if (keys[movementKeyCodes.P1Jump]) {
      playerOne.y -= 6;
      isJumping = isJumping;
      playerOne.texture = isJumping ? playerOneIdle : playerOneJump;
    }
    if (keys[movementKeyCodes.P2Jump]) {
      playerTwo.y -= 6;
    }
    //Movement left
    if (keys[movementKeyCodes.P1Left]) {
      playerOne.anchor.x = 1;
      playerOne.scale.x = -1;
      playerOne.x -= 6;
      isRunning = true;
      if (isRunning) {
        if (isLeftTexture) {
          playerOne.texture = playerOneRight;
        } else {
          playerOne.texture = playerOneLeft;
        }
        isLeftTexture = !isLeftTexture;
      }
    }
    if (keys[movementKeyCodes.P2Left]) {
      playerTwo.anchor.x = 1;
      playerTwo.scale.x = -1;
      playerTwo.x -= 6;
    }
    //Movement right
    if (keys[movementKeyCodes.P1Right]) {
      playerOne.anchor.x = 0;
      playerOne.scale.x = 1;
      playerOne.x += 6;
    }
    if (keys[movementKeyCodes.P2Right]) {
      playerTwo.anchor.x = 0;
      playerTwo.scale.x = 1;
      playerTwo.x += 6;
    }
  }
});
