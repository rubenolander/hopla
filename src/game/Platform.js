import { App } from "./PixiApp";
import Matter from "matter-js";
import * as PIXI from "pixi.js";

export class Platform {
  constructor(posX, posY, width, height) {
    this.createSprite(posX, posY, width, height);
    this.createBody(posX, posY, width, height);
  }

  createSprite(posX, posY, width, height) {
    this.texture = PIXI.Texture.from("/sprites/bulk.png");

    this.platform = new PIXI.TilingSprite(this.texture, width, height);
    this.platform.position.y = posY;
    this.platform.position.x = posX;

    App.add(this.platform);
  }

  createBody(posX, posY, width, height) {
    this.body = Matter.Bodies.rectangle(posX + 300, posY, width, height, {
      isStatic: true,
      friction: 0,
    });
    this.body.gamePlatform = this;
    Matter.World.add(App.physics.world, this.body);
  }
}
