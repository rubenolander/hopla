import { App } from "./PixiApp";
import Matter from "matter-js";
import * as PIXI from "pixi.js";

export class Platform {
  static platforms = [];
  constructor(posX, posY, width, height) {
    this.createPlatform(posX, posY, width, height);
    /* this.createBody(posX, posY, width, height); */
  }

  createPlatform(posX, posY, width, height) {
    this.texture = PIXI.Texture.from("/sprites/bulk.png");

    this.sprite = new PIXI.TilingSprite(this.texture, width, height);
    this.sprite.position.y = posY;
    this.sprite.position.x = posX;

    App.add(this.sprite);

    this.body = Matter.Bodies.rectangle(posX + 300, posY, width, height, {
      isStatic: true,
      friction: 0,
    });
    this.body.gamePlatform = this;
    const platformObject = { sprite: this.sprite, body: this.body };
    Platform.platforms.push(platformObject);
    Matter.World.add(App.physics.world, this.body);
  }

  move(number) {
    if (this.body) {
      Matter.Body.setPosition(this.body, { y: -number });
    }
  }
}
