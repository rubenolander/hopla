import * as PIXI from "pixi.js";
import Matter from "matter-js";
import { App } from "./PixiApp";
import { Background } from "./Background";
import { Floor } from "./Floor";
import { Platforms } from "./Platforms";
import { Player } from "./Player";

export class Game {
  constructor() {
    this.startGame();
    this.setBackground();
    this.setFloor();
    this.createPlayers();
    this.setEvents();
    this.setGameLoopAndCamera();
    this.createPlatforms();
  }

  startGame() {
    App.run();
  }

  setBackground() {
    this.background = new Background();
  }

  setFloor() {
    this.floor = new Floor();
  }

  createPlatforms() {
    new Platforms(600, 300, 64, 32);
    new Platforms(500, 400, 64, 32);
    new Platforms(400, 520, 100, 32);

    this.platforms = new Platforms(320, 600, 100, 32);
  }

  createPlayers() {
    console.log((document.body.offsetHeight / 30) * 2);
    this.playerOne = new Player(
      document.body.offsetWidth / 4,
      document.body.offsetHeight - 110,
      (document.body.offsetHeight / 30) * 2,
      (document.body.offsetHeight / 30) * 2,
      "ostrich"
    );
    this.playerTwo = new Player(
      (document.body.offsetWidth * 2) / 3,
      document.body.offsetHeight - 150,
      (document.body.offsetHeight / 30) * 2,
      (document.body.offsetHeight / 30) * 2,
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
      this.playerOne.update();
      this.playerTwo.update();
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
          let heightDifference = playerOneY - halfwayPoint;
          this.background.update(heightDifference / 30);
          this.platforms.update(heightDifference / 50);
          Matter.Body.setPosition(this.playerOne.body, {
            x: this.playerOne.body.position.x,
            y: halfwayPoint + heightDifference,
          });
        }
      } else if (playerTwoY < halfwayPoint) {
        let heightDifference = playerTwoY - halfwayPoint;
        this.background.update(heightDifference / 30);
        this.platforms.update(heightDifference / 50);
        Matter.Body.setPosition(this.playerTwo.body, {
          x: this.playerTwo.body.position.x,
          y: halfwayPoint + heightDifference,
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
      if (playerOne && playerOne.velocity.y > 0) {
        this.playerOne.onGround(platform.gamePlatform);
      } else if (playerTwo && playerTwo.velocity.y > 0) {
        this.playerTwo.onGround(platform.gamePlatform);
      }
    }
  }
}
