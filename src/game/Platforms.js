import { App } from "./PixiApp";
import Matter from "matter-js";
import * as PIXI from "pixi.js";

export class Platforms {
  static platforms = [];
  constructor(posX, posY, width, height) {
    this.createPlatform(posX, posY, width, height);
  }

  get platformData() {
    this.spriteWidth = PIXI.Texture.from("/sprites/girder.png").width * 64;
    let limits = {
      width: { min: this.spriteWidth * 2, max: this.spriteWidth * 8 },
      height: 2,
    };

    let data = {};
  }

  createPlatform(posX, posY, width, height) {
    this.texture = PIXI.Texture.from("/sprites/girder.png");
    console.log(posX, posY, width, height);
    this.sprite = new PIXI.TilingSprite(this.texture, width, height);
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
}
