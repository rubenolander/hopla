import { App } from "./PixiApp";
import Matter from "matter-js";
import * as PIXI from "pixi.js";

export class Platform {
  constructor(posX, posY, width, height) {
    this.platforms = [];
    this.createPlatform(posX, posY, width, height);
  }

  createPlatform(posX, posY, width, height) {
    this.texture = PIXI.Texture.from("/sprites/bulk.png");

    this.sprite = new PIXI.TilingSprite(this.texture, width, height);
    this.sprite.position.x = posX;
    this.sprite.position.y = posY;

    App.add(this.sprite);

    this.body = Matter.Bodies.rectangle(
      posX + width / 2,
      posY + height / 2,
      width,
      height,
      {
        isStatic: true,
        friction: 0,
      }
    );
    this.body.gamePlatform = this;
    const platformObject = { sprite: this.sprite, body: this.body };
    this.platforms.push(platformObject);
    Matter.World.add(App.physics.world, this.body);
  }

  move(platform, number) {
    platform.sprite.position.y -= number;
    Matter.Body.translate(platform.body, {
      x: platform.body.position.x,
      y: platform.body.position.y - number,
    });
  }

  update(number) {
    this.platforms.forEach((platform) => {
      this.move(platform, number);
    });
  }
}
