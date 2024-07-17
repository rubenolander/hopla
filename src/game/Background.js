import { App } from "./Application";
import { Container, Sprite, Assets } from "pixi.js";

export class Background {
  constructor() {
    this.container = new Container();
    this.createBackground();
  }

  createBackground() {
    this.sprites = [];

    for (let tiles = 0; tiles < 3; tiles++) {
      this.createBackgroundSprite(tiles);
    }
  }

  async createBackgroundSprite(tiles) {
    const sprite = Sprite.from("../sprites/background.png");

    const gameWindow = document.querySelector(".game");
    const gameWidth = gameWindow.offsetWidth;
    const gameHeight = gameWindow.offsetHeight;

    sprite.width = gameWidth / 1.0;
    sprite.height = gameHeight;
    sprite.x = gameWidth - sprite.width;

    sprite.y = sprite.height * tiles;

    this.container.addChild(sprite);
    this.sprites.push(sprite);

    App.add(this.container);
  }

  move(sprite, offset) {
    const spriteDown = sprite.y - sprite.height;

    if (spriteDown >= document.querySelector(".game").offsetHeight) {
      sprite.y -= sprite.height * this.sprites.length;
    }
    sprite.y -= offset;
  }

  update(offset) {
    this.sprites.forEach((sprite) => {
      this.move(sprite, offset);
    });
  }

  destroy() {
    this.container.destroy();
  }
}
