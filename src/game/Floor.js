import { App } from "./PixiApp";
import Matter from "matter-js";
import * as PIXI from "pixi.js";

export class Floor {
  constructor() {
    this.createSprite();
    this.createBody();
  }

  createSprite() {
    this.texture = PIXI.Texture.from("/sprites/bulk.png");

    this.floor = new PIXI.TilingSprite(this.texture, App.app.screen.width, 30);
    this.floor.position.y = App.app.screen.height - this.floor.height;
    App.add(this.floor);
  }

  createBody() {
    this.body = Matter.Bodies.rectangle(
      0,
      App.app.screen.height,
      document.body.offsetWidth * 2,
      58,
      {
        isStatic: true,
      }
    );
    Matter.World.add(App.physics.world, this.body);
  }
}
