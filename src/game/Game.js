import * as PIXI from "pixi.js";
import Matter from "matter-js";
import { App } from "./PixiApp";
import { Background } from "./Background";
import { Floor } from "./Floor";
import { Player } from "./Player";

export class Game {
  constructor() {
    this.startGame();
    this.setBackground();
    this.setFloor();
    this.createPlayers();
    this.setEvents();
    this.setGameLoop();
  }

  startGame() {
    App.run();
  }
  setBackground() {
    this.background = new Background();
    App.add(this.background.bg);
  }
  setFloor() {
    new Floor();
  }

  createPlayers() {
    this.playerOne = new Player(
      document.body.offsetWidth / 4,
      document.body.offsetHeight - 50,
      "ostrich"
    );
    this.playerTwo = new Player(
      (document.body.offsetWidth * 2) / 3,
      document.body.offsetHeight - 50,
      "other"
    );
  }

  setGameLoop() {
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
    const playerTwo = colliders.find((body) => body.bodyName === "other");

    const platform = colliders.find((body) => body.gamePlatform);
    if ((playerOne && platform) || (playerTwo && platform)) {
      if (playerOne) {
        this.playerOne.onGround(platform.gamePlatform);
      } else if (playerTwo) {
        this.playerTwo.onGround(platform.gamePlatform);
      }
    }
  }
}
