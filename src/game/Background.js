import { App } from "./Application";
import { Container, Sprite } from "pixi.js";

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
    App.add(this.container);
  }

  createBackgroundSprite(tiles) {
    const sprite = Sprite.from("../sprites/background.png");

    sprite.width = App.gameWidth;
    sprite.height = App.gameHeight;
    sprite.x = App.gameWidth - sprite.width;

    sprite.y = sprite.height * tiles;

    this.container.addChild(sprite);
    this.sprites.push(sprite);
  }

  move(sprite, offset) {
    const spriteDown = sprite.y - sprite.height;

    if (spriteDown >= App.gameHeight) {
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
