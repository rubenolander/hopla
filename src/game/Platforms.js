import { App } from "./Application";
import Matter from "matter-js";
import { Texture, TilingSprite } from "pixi.js";

export class Platforms {
  static platforms = [];

  createPlatform(posX, posY, width, height) {
    setTimeout(() => {
      this.texture = Texture.from("../sprites/girder.png");
      this.sprite = new TilingSprite({
        texture: this.texture,
        width: width,
        height: height,
      });
      this.sprite.position.x = posX - width / 2;
      this.sprite.position.y = posY - height / 2;

      this.body = Matter.Bodies.rectangle(posX, posY, width, height, {
        isStatic: true,
        friction: 0,
      });

      this.body.gamePlatform = this;
      const platformObject = { sprite: this.sprite, body: this.body };
      Platforms.platforms.push(platformObject);
      Matter.World.add(App.physics.world, this.body);
      App.add(this.sprite);
      this.hasExitedScreen = false;
    }, 800);
  }

  createFloor() {
    let gameWidth = document.querySelector(".game").offsetWidth;
    let gameHeight = document.querySelector(".game").offsetHeight;
    this.floor = this.createPlatform(gameWidth / 2, gameHeight, gameWidth, 30);
    this.leftWall = this.createPlatform(gameWidth, gameHeight - 40, 64, 200);

    this.rightWall = this.createPlatform(0, gameHeight - 40, 64, 200);
  }

  createStarterPlatforms() {
    let gameWidth = document.querySelector(".game").offsetWidth;
    let gameHeight = document.querySelector(".game").offsetHeight;

    setTimeout(() => {
      this.createPlatform(
        gameWidth / 2,
        gameHeight - gameHeight / 6,
        64 * 10,
        32
      );
      this.createPlatform(gameWidth / 2, 620, 64 * 6, 32);
      this.createPlatform(gameWidth / 2, 520, 64 * 4, 32);
      this.createPlatform(gameWidth / 2, 420, 64 * 2, 32);
      this.createPlatform(gameWidth / 4, 220, 64 * 4, 32);
      this.createPlatform(gameWidth / 4 + gameWidth / 2, 100, 64 * 4, 32);
    }, 3500);
  }

  move(platform, number) {
    platform.sprite.position.y -= number;
    Matter.Body.setPosition(platform.body, {
      x: platform.body.position.x,
      y: platform.body.position.y - number,
    });
  }

  update(number) {
    Platforms.platforms.forEach((platform) => {
      this.move(platform, number);
    });
  }

  destroy() {
    App.app.stage.removeChild(this.sprite);
    Matter.World.remove(App.physics.world, this.body);
  }
}
