import { App } from "./PixiApp";
import Matter from "matter-js";
import * as PIXI from "pixi.js";

export class Player {
  constructor(posX, posY, width, height, character) {
    this.createBody(posX, posY, width, height, character);
    this.createSprite(posX, posY, width, height, character);
    this.isJumping = false;
  }

  getSprites() {
    this.spriteLeft = PIXI.Texture.from("../sprites/ostrichLeft.png");
    this.spriteRight = PIXI.Texture.from("../sprites/ostrichRight.png");
    this.spriteIdle = PIXI.Texture.from("../sprites/ostrichIdle.png");
    this.spriteJump = PIXI.Texture.from("../sprites/ostrichJump.png");

    this.images = ["../sprites/ostrichLeft.png", "../sprites/ostrichRight.png"];

    this.imagesArray = [];

    for (let i = 0; i < 2; i++) {
      this.texture = PIXI.Texture.from(this.images[i]);
      this.imagesArray.push(this.texture);
    }

    this.animatedOstrich = new PIXI.AnimatedSprite(this.imagesArray);
    this.spriteRun = new PIXI.AnimatedSprite([
      this.spriteLeft,
      this.spriteRight,
    ]);
    this.spriteRun.loop = true;
    this.spriteRun.animationSpeed = 0.1;
    this.spriteRun.anchor.set(0.5);
  }

  createBody(posX, posY, width, height, character) {
    this.body = Matter.Bodies.rectangle(posX, posY, width, height, {
      collisionFilter: { category: 0x0001 },
      friction: 0,
      isStatic: false,
      bodyName: character,
      frictionAir: 0.04,
    });
    Matter.World.add(App.physics.world, this.body);
    this.body.player = this;
  }

  createSprite(posX, posY, width, height, character) {
    this.getSprites();
    if (character === "ostrich") {
      this.sprite = new PIXI.AnimatedSprite([this.spriteIdle]);
    } else if (character === "other") {
      this.sprite = new PIXI.AnimatedSprite([this.spriteJump]);
    }
    this.sprite.loop = true;
    this.sprite.animationSpeed = 0.1;
    this.sprite.x = posX;
    this.sprite.y = posY;
    this.sprite.width = width;
    this.sprite.height = height;
    this.sprite.anchor.set(0.5, 0.5);
    App.add(this.sprite);
  }

  move(direction) {
    if (
      (direction === "left" && !this.sprite.playing) ||
      (direction === "right" && !this.sprite.playing)
    ) {
      this.sprite.textures = [this.spriteLeft, this.spriteRight];
      this.sprite.play();
    }
    {
      this.sprite.textures = [this.spriteLeft, this.spriteRight];
      this.sprite.play();
    }
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
      this.sprite.textures = [this.spriteJump];
      this.sprite.stop();
      this.isJumping = true;
      this.jumpIndex++;
      this.platform = null;
      Matter.Body.setVelocity(this.body, {
        x: 0,
        y: -(document.body.offsetHeight / 60),
      });
      new Audio("/sounds/jump.wav").play();
    }
  }

  idle() {
    this.sprite.texture = this.spriteIdle;
    this.sprite.stop();
  }

  onGround(platform) {
    this.sprite.texture = this.spriteIdle;
    this.platform = platform;
    this.jumpIndex = 0;
    this.isJumping = false;
    this.sprite.stop();
    this.fallArray = [];
    for (let i = 1; i < 4; i++) {
      var fallSound = `/sounds/fall${i}.wav`;
      this.fallArray.push(fallSound);
    }
    var sound =
      this.fallArray[Math.floor(Math.random() * this.fallArray.length)];
    new Audio(sound).play();
  }

  update() {
    this.sprite.x = this.body.position.x - this.sprite.width / 2;
    this.sprite.y = this.body.position.y - this.sprite.height / 2;
  }
}
