import * as PIXI from "pixi.js";

export class Background {
  constructor() {
    this.createBackground();
  }

  createBackground() {
    const gameWindow = document.querySelector(".game");

    const gameWidth = gameWindow.offsetWidth;
    const gameHeight = gameWindow.offsetHeight;

    this.bg = PIXI.Sprite.from("../sprites/background.png");
    this.bg.width = gameWindow.offsetWidth / 1.01;
    this.bg.x = gameWidth - this.bg.width;
    this.bg.height = gameHeight;
    return this.bg;
  }

  createSprites() {
    this.sprites = [];

    for (let tiles = 0; tiles < 3; tiles++) {
      this.createSprite(tiles);
    }
  }
  createSprite(tiles) {
    this.sprite = PIXI.Sprite.from("/sprites/background.png");

    sprite.y = sprite.height * tiles;
    this.container.addChild(sprite);
    this.sprites.push(sprite);
  }
  destroy() {
    this.container.destroy();
  }
}
