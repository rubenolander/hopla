import Matter from "matter-js";
import { App } from "./Application";
import { Background } from "./Background";
import { GameText } from "./Text";
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

  reset() {
    this.playerOne.destroy();
    this.playerTwo.destroy();
    this.platforms.destroy();
    this.background.destroy();
    this.preGameTexts.destroy();
    this.endGameTexts.destroy();
    App.app.ticker.stop();
    Matter.Events.off(App.physics, "collisionStart");

    this.init();
  }

  startGame() {
    App.run();
  }

  setBackground() {
    this.background = new Background();
  }

  setTexts() {
    this.preGameTexts = new GameText();
    this.endGameTexts = new GameText();
    this.preGameTexts.printStartingTexts();
    this.preGameTexts.printGetReadyTexts();
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
        const numberArray = [3, 4, 5];
        const randomIndex = Math.floor(Math.random() * numberArray.length);
        const randomMultiplier = numberArray[randomIndex];
        const platformWidth = randomMultiplier * 64;

        this.platforms.createPlatform(
          Math.random() * App.gameWidth,
          -30,
          platformWidth,
          32
        );
        platform.hasExitedScreen = true;
        App.remove(platform.sprite);
        Matter.World.remove(App.physics.world, platform.body);

        //Making sure the platform is removed from the platform array in the class.
        Platforms.platforms = Platforms.platforms.filter(
          (occurence) => occurence !== platform
        );
      }
    } else {
      platform.hasExitedScreen = false;
    }
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
      App.app.ticker.start();
      let gameKeys = {};
      let gameOver = false;
      let gameKeyCodes = {
        P1Jump: "KeyW",
        P1Left: "KeyA",
        P1Right: "KeyD",
        P2Jump: "ArrowUp",
        P2Left: "ArrowLeft",
        P2Right: "ArrowRight",
        resetGame: "KeyY",
      };
      window.addEventListener("keydown", keysDown);
      window.addEventListener("keyup", keysUp);

      function keysDown(e) {
        gameKeys[e.code] = true;
      }
      function keysUp(e) {
        gameKeys[e.code] = false;
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
          const playerActions = [
            {
              player: this.playerOne,
              keys: [
                gameKeyCodes.P1Jump,
                gameKeyCodes.P1Left,
                gameKeyCodes.P1Right,
              ],
            },
            {
              player: this.playerTwo,
              keys: [
                gameKeyCodes.P2Jump,
                gameKeyCodes.P2Left,
                gameKeyCodes.P2Right,
              ],
            },
          ];
          playerActions.forEach(({ player, keys }) => {
            if (gameKeys[keys[0]]) player.jump();
            if (gameKeys[keys[1]]) player.move("left");
            if (gameKeys[keys[2]]) player.move("right");
          });
        } else if (gameKeys[gameKeyCodes.resetGame]) {
          this.reset();
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
            this.preGameTexts.move(heightDifference / 48);
            Matter.Body.setPosition(this.playerOne.body, {
              x: this.playerOne.body.position.x,
              y: halfwayPoint + heightDifference,
            });
          }
        } else if (playerTwoY < halfwayPoint) {
          let heightDifference = playerTwoY - halfwayPoint;
          this.background.update(heightDifference / 30);
          this.platforms.update(heightDifference / 48);
          this.preGameTexts.move(heightDifference / 48);
          Matter.Body.setPosition(this.playerTwo.body, {
            x: this.playerTwo.body.position.x,
            y: halfwayPoint + heightDifference,
          });
        }
      }
    }, 500);
  }

  endGame(player) {
    this.endGameTexts.printGameOverTexts(player.body.bodyName);
    player.body.isStatic = true;
  }
}
