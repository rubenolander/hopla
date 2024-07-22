import { Text } from "pixi.js";
import Matter from "matter-js";
import { App } from "./Application";
import { Background } from "./Background";
import { InfoText } from "./Text";
import { Platforms } from "./Platforms";
import { Player } from "./Player";

export class Game {
  constructor() {
    this.init();
  }

  init() {
    this.startGame();
    this.setBackground();
    this.setTexts();
    this.createPlatforms();
    this.createPlayers();
    this.setEvents();
    this.setGameLoopAndCamera();
  }

  startGame() {
    App.run();
  }

  setBackground() {
    this.background = new Background();
  }

  setTexts() {
    this.texts = new InfoText();
  }

  createPlatforms() {
    this.platforms = new Platforms();
    this.platforms.createFloor();
    this.platforms.createStarterPlatforms();
  }

  createPlayers() {
    this.playerOne = new Player(
      App.gameWidth / 4,
      App.gameHeight - 110,
      (App.gameHeight / 30) * 1,
      (App.gameHeight / 30) * 1,
      "ostrich"
    );
    this.playerTwo = new Player(
      (App.gameWidth * 2) / 2.6,
      App.gameHeight - 120,
      (App.gameHeight / 30) * 1,
      (App.gameHeight / 30) * 1,
      "dodo"
    );
  }

  createNewPlatformIfNeeded(platform) {
    if (platform.sprite.position.y > App.gameHeight + 75) {
      if (!platform.hasExitedScreen) {
        this.platforms.createPlatform(
          Math.random() * App.gameWidth,
          -30,
          200,
          30
        );
        platform.hasExitedScreen = true;
        App.remove(platform.sprite);
        Matter.World.remove(App.physics.world, platform.body);
      }
    } else {
      platform.hasExitedScreen = false;
    }
  }

  endGame(player) {
    const style = {
      fontFamily: "2p",
      fontSize: 70,
      align: "center",
      fill: 0xffffff,
    };
    const gameOverText = new Text({
      text: `${player.body.bodyName} wins!`,
      style,
    });
    gameOverText.x = App.gameWidth / 2 - gameOverText.width / 2;
    gameOverText.y = App.gameHeight / 2;

    const restartText = new Text({
      text: "Please refresh page to play again.",
      style,
    });
    restartText.x = 5;
    restartText.y = 5;

    this.texts.destroy();

    App.add(gameOverText);
    App.add(restartText);
    player.body.isStatic = true;
  }

  setEvents() {
    setTimeout(() => {
      Matter.Events.on(
        App.physics,
        "collisionStart",
        this.onCollisionStart.bind(this)
      );
    }, 500);
  }

  onCollisionStart(e) {
    const colliders = [e.pairs[0].bodyA, e.pairs[0].bodyB];
    const playerOne = colliders.find((body) => body.bodyName === "ostrich");
    const platform = colliders.find((body) => body.gamePlatform);
    const playerTwo = colliders.find((body) => body.bodyName === "dodo");

    if (platform) {
      if (playerOne && playerOne.velocity.y > 0) {
        this.playerOne.onGround(platform.gamePlatform);
      } else if (playerTwo && playerTwo.velocity.y > 0) {
        this.playerTwo.onGround(platform.gamePlatform);
      }
    }
  }

  setGameLoopAndCamera() {
    setTimeout(() => {
      let keys = {};
      let gameOver = false;
      let gameKeyCodes = {
        P1Jump: 87,
        P1Left: 65,
        P1Right: 68,
        P2Jump: 38,
        P2Left: 37,
        P2Right: 39,
        resetGame: 89,
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

        Platforms.platforms.forEach((platform) => {
          this.createNewPlatformIfNeeded(platform);
        });

        //Game controls
        if (!gameOver) {
          //Jumps
          if (keys[gameKeyCodes.P1Jump]) {
            this.playerOne.jump();
          }
          if (keys[gameKeyCodes.P2Jump]) {
            this.playerTwo.jump();
          }
          //Movement left
          if (keys[gameKeyCodes.P1Left]) {
            this.playerOne.move("left");
          }
          if (keys[gameKeyCodes.P2Left]) {
            this.playerTwo.move("left");
          }
          //Movement right
          if (keys[gameKeyCodes.P1Right]) {
            this.playerOne.move("right");
          }
          if (keys[gameKeyCodes.P2Right]) {
            this.playerTwo.move("right");
          }
        } else if (gameOver) {
          if (keys[gameKeyCodes.resetGame]) {
            this.playerOne.destroy();
            this.playerTwo.destroy();
            this.platforms.destroy();
            App.app.ticker.remove(gameLoop);
          }
        }

        const playerOneY = this.playerOne.body.position.y;
        const playerTwoY = this.playerTwo.body.position.y;
        const halfwayPoint = App.gameHeight / 2;
        if (playerOneY > App.gameHeight + 75) {
          gameOver = true;
          this.endGame(this.playerTwo);
        } else if (playerTwoY > App.gameHeight + 75) {
          gameOver = true;
          this.endGame(this.playerOne);
        }

        if (playerOneY < halfwayPoint || playerOneY < halfwayPoint) {
          if (playerOneY < halfwayPoint) {
            let heightDifference = playerOneY - halfwayPoint;
            this.background.update(heightDifference / 30);
            this.platforms.update(heightDifference / 48);
            this.texts.move(heightDifference / 48);
            Matter.Body.setPosition(this.playerOne.body, {
              x: this.playerOne.body.position.x,
              y: halfwayPoint + heightDifference,
            });
          }
        } else if (playerTwoY < halfwayPoint) {
          let heightDifference = playerTwoY - halfwayPoint;
          this.background.update(heightDifference / 30);
          this.platforms.update(heightDifference / 48);
          this.texts.move(heightDifference / 48);
          Matter.Body.setPosition(this.playerTwo.body, {
            x: this.playerTwo.body.position.x,
            y: halfwayPoint + heightDifference,
          });
        }
      }
    }, 500);
  }
}
