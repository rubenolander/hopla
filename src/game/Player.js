import { App } from "./PixiApp";
import Matter from "matter-js";
import * as PIXI from "pixi.js";

export class Player {
  constructor(posX, posY, character) {
    this.createBody(posX, posY, character);
    this.createSprite(posX, posY, character);
    App.app.ticker.add(this.update, this);
  }

  createBody(posX, posY, character) {
    this.body = Matter.Bodies.rectangle(posX, posY, 32, 32, {
      collisionFilter: { category: 0x0001 },
      friction: 0,
      isStatic: false,
      bodyName: character,
      frictionAir: 0.04,
    });
    Matter.World.add(App.physics.world, this.body);
    this.body.player = this;
  }

  createSprite(posX, posY, character) {
    if (character === "ostrich") {
      this.spriteTexture = PIXI.Texture.from("../sprites/ostrichIdle.png");
      this.sprite = new PIXI.Sprite(this.spriteTexture);
    } else if (character === "other") {
      this.spriteTexture = PIXI.Texture.from("../sprites/ostrichJump.png");
      this.sprite = new PIXI.Sprite(this.spriteTexture);
    }

    this.sprite.x = posX;
    this.sprite.y = posY;
    this.sprite.width = 32;
    this.sprite.height = 32;
    this.sprite.anchor.set(0.5, 0);
    App.add(this.sprite);
  }

  move(direction) {
    if (direction === "left") {
      this.body.position.x -= 0.5;
      this.sprite.scale.x = -1;
    } else if (direction === "right") {
      this.body.position.x += 0.5;
      this.sprite.scale.x = 1;
    }
  }

  jump() {
    if (this.platform && this.jumpIndex < 1) {
      this.jumpIndex++;
      this.platform = null;
      Matter.Body.setVelocity(this.body, { x: 0, y: -45 });
    }
  }

  onGround(platform) {
    this.platform = platform;
    this.jumpIndex = 0;
  }

  update() {
    this.sprite.x = this.body.position.x - this.sprite.width / 2;
    this.sprite.y = this.body.position.y - this.sprite.height / 2;
  }
}
