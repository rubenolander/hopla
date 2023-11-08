import * as PIXI from "pixi.js";
import Matter from "matter-js";
import { App } from "./PixiApp";
import { Background } from "./Background";
import { Floor } from "./Floor";
import { Platform } from "./Platform";
import { Player } from "./Player";

export class Game {
  constructor() {
    this.startGame();
    this.setBackground();
    this.setFloor();
    this.createPlayers();
    this.setEvents();
    this.setGameLoopAndCamera();
    this.createPlatform();
  }

  startGame() {
    App.run();
  }

  setBackground() {
    this.background = new Background();
    App.add(this.background.bg);
  }

  setFloor() {
    this.floor = new Floor();
  }

  createPlatform(posX, posY, width, height) {
    console.log(document.body.offsetWidth / 3);
    new Platform(document.body.offsetWidth / 3, 800, 600, 30);
    new Platform(document.body.offsetWidth / 2, 500, 300, 30);
  }

  createPlayers() {
    this.playerOne = new Player(
      document.body.offsetWidth / 4,
      document.body.offsetHeight - 100,
      "ostrich"
    );
    this.playerTwo = new Player(
      (document.body.offsetWidth * 2) / 3,
      document.body.offsetHeight - 65,
      "other"
    );
  }

  setGameLoopAndCamera() {
    let keys = {};

    let movementKeyCodes = {
      P1Jump: 87,
      P1Left: 65,
      P1Right: 68,
      P2Jump: 38,
      P2Left: 37,
      P2Right: 39,
    };
    window.addEventListener("keydown", keysDown);
    window.addEventListener("keyup", keysUp);

    function keysDown(e) {
      keys[e.keyCode] = true;
    }
    function keysUp(e) {
      keys[e.keyCode] = false;
    }

    App.app.ticker.add(gameLoop.bind(this));

    function gameLoop() {
      //Jumps
      if (keys[movementKeyCodes.P1Jump]) {
        this.playerOne.jump();
      }
      if (keys[movementKeyCodes.P2Jump]) {
        this.playerTwo.jump();
      }
      //Movement left
      if (keys[movementKeyCodes.P1Left]) {
        this.playerOne.move("left");
      }
      if (keys[movementKeyCodes.P2Left]) {
        this.playerTwo.move("left");
      }
      //Movement right
      if (keys[movementKeyCodes.P1Right]) {
        this.playerOne.move("right");
      }
      if (keys[movementKeyCodes.P2Right]) {
        this.playerTwo.move("right");
      }

      const playerOneY = this.playerOne.body.position.y;
      const playerTwoY = this.playerTwo.body.position.y;
      const screenHeight = window.innerHeight;
      const halfwayPoint = screenHeight / 2;

      if (playerOneY < halfwayPoint || playerOneY < halfwayPoint) {
        if (playerOneY < halfwayPoint) {
          let centerDiff = playerOneY - halfwayPoint;
          this.background.bg.y -= centerDiff / 40;

          Platform.platforms.forEach((platform) => {
            platform.sprite.position.y -= centerDiff / 40;

            // Update the Matter.js body position based on centerDiff
            Matter.Body.setPosition(platform.body, {
              x: platform.body.position.x,
              y: platform.body.position.y - centerDiff / 40,
            });
          });
          Matter.Body.setPosition(this.playerOne.body, {
            x: this.playerOne.body.position.x,
            y: halfwayPoint + centerDiff,
          });
        }
      } else if (playerTwoY < halfwayPoint) {
        let centerDiff = playerTwoY - halfwayPoint;
        this.background.bg.y -= centerDiff / 40;
        Platform.platforms.forEach((platform) => {
          platform.sprite.position.y -= centerDiff / 40;

          // Update the Matter.js body position based on centerDiff
          Matter.Body.setPosition(platform.body, {
            x: platform.body.position.x,
            y: platform.body.position.y - centerDiff / 40,
          });
        });
        Matter.Body.setPosition(this.playerTwo.body, {
          x: this.playerTwo.body.position.x,
          y: halfwayPoint + centerDiff,
        });
      }
    }
  }

  setEvents() {
    Matter.Events.on(
      App.physics,
      "collisionStart",
      this.onCollisionStart.bind(this)
    );
  }

  onCollisionStart(e) {
    const colliders = [e.pairs[0].bodyA, e.pairs[0].bodyB];
    const playerOne = colliders.find((body) => body.bodyName === "ostrich");
    const platform = colliders.find((body) => body.gamePlatform);
    const playerTwo = colliders.find((body) => body.bodyName === "other");

    if (platform) {
      if (playerOne && playerOne.velocity.y >= 0) {
        this.playerOne.onGround(platform.gamePlatform);
      } else if (playerTwo && playerTwo.velocity.y >= 0) {
        this.playerTwo.onGround(platform.gamePlatform);
      }
    }
  }
}
