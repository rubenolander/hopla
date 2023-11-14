import { App } from "./PixiApp";
import Matter from "matter-js";
import * as PIXI from "pixi.js";

export class Floor {
  constructor() {
    this.createSprite();
    this.createBody();
  }

  createSprite() {
    this.texture = PIXI.Texture.from("/sprites/girder.png");

    this.floor = new PIXI.TilingSprite(
      this.texture,
      App.app.screen.width,
      (document.body.offsetHeight / 30) * 2
    );
    console.log(this.floor.height);
    this.floor.position.y = App.app.screen.height - this.floor.height;
    App.add(this.floor);
  }

  createBody() {
    this.body = Matter.Bodies.rectangle(
      0,
      App.app.screen.height,
      document.body.offsetWidth * 2,
      (document.body.offsetHeight / 30) * 3,
      {
        collisionFilter: { category: 0x0001 },
        isStatic: true,
        isSensor: false,
      }
    );
    this.body.gamePlatform = this;

    Matter.World.add(App.physics.world, this.body);
  }
}
