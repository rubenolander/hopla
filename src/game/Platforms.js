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
    }, 500);
  }

  createFloor() {
    this.floor = this.createPlatform(
      App.gameWidth / 2,
      App.gameHeight,
      App.gameWidth,
      32
    );
    this.leftWall = this.createPlatform(
      App.gameWidth,
      App.gameHeight - 40,
      64,
      200
    );

    this.rightWall = this.createPlatform(0, App.gameHeight - 40, 64, 200);
  }

  //This function creates the starting platforms after some time.
  createStarterPlatforms() {
    setTimeout(() => {
      //Big, almost half screen width platform just above players.
      this.createPlatform(
        App.gameWidth / 2,
        App.gameHeight - App.gameHeight / 4.5,
        64 * 10,
        32
      );
      //Quarter size platform just above it.
      this.createPlatform(
        App.gameWidth / 2,
        App.gameHeight - App.gameHeight / 2.5,
        64 * 6,
        32
      );
      //Hidden platform for starters, to create more during the game.
      this.createPlatform(
        App.gameWidth / 2,
        App.gameHeight - App.gameHeight / 2,
        64 * 4,
        0
      );
      this.createPlatform(App.gameWidth / 2, App.gameHeight / 2, 64 * 2, 32);

      //The following three are spread out, left, right and middle (spawning above game screen).
      //to make it interesting but also not a random start.
      this.createPlatform(App.gameWidth / 4, App.gameHeight / 4.2, 64 * 4, 32);

      this.createPlatform(
        App.gameWidth - App.gameWidth / 4,
        App.gameHeight / 10,
        64 * 4,
        32
      );

      this.createPlatform(App.gameWidth / 2, -App.gameHeight / 10, 64 * 4, 32);
    }, 3000);
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
    Platforms.platforms.forEach((platform) => {
      App.remove(platform.sprite);
      Matter.World.remove(App.physics.world, this.body);
    });
    Platforms.platforms = [];
  }
}
