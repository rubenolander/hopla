import { App } from "./PixiApp";
import Matter from "matter-js";
import * as PIXI from "pixi.js";

export class Player {
  constructor(posX, posY, width, height, character) {
    this.createBody(posX, posY, width, height, character);
    this.createSprite(posX, posY, width, height, character);
  }

  getSprites(spriteType) {
    this.spriteLeft = PIXI.Texture.from(`../sprites/${spriteType}Left.png`);
    this.spriteRight = PIXI.Texture.from(`../sprites/${spriteType}Right.png`);
    this.spriteIdle = PIXI.Texture.from(`../sprites/${spriteType}Idle.png`);
    this.spriteJump = PIXI.Texture.from(`../sprites/${spriteType}Jump.png`);
    return this;
  }

  createBody(posX, posY, width, height, character) {
    this.body = Matter.Bodies.rectangle(posX, posY, width / 4, height / 4, {
      collisionFilter: { category: 0x0002 },
      friction: 0.1,
      isStatic: false,
      angle: 0,
      bodyName: character,
      frictionAir: 0.05,
      plugin: {
        wrap: {
          min: {
            x: 0,
          },
          max: {
            x: document.querySelector("canvas").offsetWidth,
          },
        },
      },
    });
    Matter.World.add(App.physics.world, this.body);
  }

  createSprite(posX, posY, width, height, character) {
    this.getSprites("ostrich");
    this.sprite = new PIXI.AnimatedSprite([this.spriteIdle]);
    this.sprite = new PIXI.AnimatedSprite([this.spriteJump]);
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
      Matter.Body.applyForce(
        this.body,
        { x: this.body.position.x, y: this.body.position.y },
        { x: -0.0005, y: 0 }
      );
      this.sprite.scale.x = -1;
    } else if (direction === "right") {
      Matter.Body.applyForce(
        this.body,
        { x: this.body.position.x, y: this.body.position.y },
        { x: 0.0005, y: 0 }
      );
      this.sprite.scale.x = 1;
    }
  }

  jump() {
    if (this.platform && this.jumpIndex < 1) {
      this.sprite.textures = [this.spriteJump];
      this.sprite.stop();
      this.jumpIndex++;
      this.platform = null;
      Matter.Body.setVelocity(this.body, {
        x: 0,
        y: -(document.body.offsetHeight / 48),
      });

      //Sound
      new Audio("/sounds/jump.wav").play();
    }
  }

  idle() {
    this.sprite.textures = [this.spriteIdle];
    this.sprite.stop();
  }

  onGround(platform) {
    this.sprite.textures = [this.spriteIdle];
    this.platform = platform;
    if (this.sprite.position.y > this.platform.body.position.y) {
      this.sprite.position.y =
        this.platform.body.position.y - this.sprite.height / 2;
    }
    this.jumpIndex = 0;
    this.sprite.stop();
    //Sound
    this.fallSounds = [];
    for (let i = 1; i < 4; i++) {
      var fallSound = `/sounds/fall${i}.wav`;
      this.fallSounds.push(fallSound);
    }
    var sound =
      this.fallSounds[Math.floor(Math.random() * this.fallSounds.length)];
    new Audio(sound).play();
  }

  update() {
    this.sprite.x = this.body.position.x - this.sprite.width / 2;
    this.sprite.y = this.body.position.y - this.sprite.height / 2;
  }
}
