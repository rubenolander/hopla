import { App } from "./PixiApp";
import * as PIXI from "pixi.js";

export class Background {
  constructor() {
    this.container = new PIXI.Container();
    this.createBackground();
  }

  createBackground() {
    this.sprites = [];

    for (let tiles = 0; tiles < 3; tiles++) {
      this.createBackgroundSprite(tiles);
    }
  }

  createBackgroundSprite(tiles) {
    const sprite = PIXI.Sprite.from("../sprites/background.png");

    const gameWindow = document.querySelector(".game");
    const gameWidth = gameWindow.offsetWidth;
    const gameHeight = gameWindow.offsetHeight;

    sprite.width = gameWidth / 1.01;
    sprite.height = gameHeight;
    sprite.x = gameWidth - sprite.width;

    sprite.y = sprite.height * tiles;

    this.container.addChild(sprite);
    this.sprites.push(sprite);

    App.add(this.container);
  }

  move(sprite, distance) {
    const spriteDown = sprite.y - sprite.height;

    if (spriteDown >= document.querySelector(".game").offsetHeight) {
      sprite.y -= sprite.height * this.sprites.length;
    }
    sprite.y -= distance;
  }

  update(distance) {
    this.sprites.forEach((sprite) => {
      this.move(sprite, distance);
    });
  }

  destroy() {
    this.container.destroy();
  }
}
