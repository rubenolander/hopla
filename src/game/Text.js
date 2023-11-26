import { App } from "./PixiApp";

import * as PIXI from "pixi.js";

export class InfoText {
  constructor() {
    this.container = new PIXI.Container();
    this.addText();
  }

  addText() {
    let gameWidth = document.querySelector(".game").offsetWidth;
    let gameHeight = App.app.screen.height;
    let style = {
      fontSize: 24,
      align: "center",
      fill: 0xffffff,
      fontFamily: "2p",
    };
    const playerOneJump = new PIXI.Text("W Jump", style);
    playerOneJump.x = gameWidth / 15;
    playerOneJump.y = gameHeight - gameHeight / 10;
    this.container.addChild(playerOneJump);

    const playerOneLeft = new PIXI.Text("A Left", style);
    playerOneLeft.x = gameWidth / 15;
    playerOneLeft.y = playerOneJump.y - gameHeight / 30;
    this.container.addChild(playerOneLeft);

    const playerOneRight = new PIXI.Text("D Right", style);
    playerOneRight.x = gameWidth / 15;
    playerOneRight.y = playerOneJump.y + gameHeight / 30;
    this.container.addChild(playerOneRight);

    const playerTwoJump = new PIXI.Text(`\u2191 Jump`, style);
    playerTwoJump.x = gameWidth - gameWidth / 6;
    playerTwoJump.y = gameHeight - gameHeight / 10;
    this.container.addChild(playerTwoJump);

    const playerTwoLeft = new PIXI.Text(`\u2190 Left`, style);
    playerTwoLeft.x = gameWidth - gameWidth / 6;
    playerTwoLeft.y = playerTwoJump.y - gameHeight / 30;
    this.container.addChild(playerTwoLeft);

    const playerTwoRight = new PIXI.Text(`\u2192 Right`, style);
    playerTwoRight.x = gameWidth - gameWidth / 6;
    playerTwoRight.y = playerTwoJump.y + gameHeight / 30;
    this.container.addChild(playerTwoRight);

    const gameTitle = new PIXI.Text("H O P L A", {
      fontSize: 70,
      align: "center",
      fill: 0xffffff,
      fontFamily: "2p",
    });
    gameTitle.x = gameWidth / 2 - gameTitle.width / 2;
    gameTitle.y = 300;
    this.container.addChild(gameTitle);

    App.add(this.container);
  }
  move(offset) {
    this.container.y -= offset;
  }
  destroy() {
    App.app.stage.removeChild(this.container);
  }
}
