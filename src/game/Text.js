import { App } from "./Application";

import { Container, Text } from "pixi.js";

export class InfoText {
  constructor() {
    this.container = new Container();
    this.addText();
  }

  async addText() {
    let gameWidth = document.querySelector(".game").offsetWidth;
    let gameHeight = document.querySelector(".game").offsetHeight;
    let textStyle = {
      fontFamily: "2p",
      fontSize: 24,
      align: "center",
      fill: 0xffffff,
    };

    const playerOneJump = new Text({ text: "W Jump", style: textStyle });
    playerOneJump.x = gameWidth / 15;
    playerOneJump.y = gameHeight - gameHeight / 10;
    this.container.addChild(playerOneJump);

    const playerOneLeft = new Text({ text: "A Left", style: textStyle });
    playerOneLeft.x = gameWidth / 15;
    playerOneLeft.y = playerOneJump.y - gameHeight / 30;
    this.container.addChild(playerOneLeft);

    const playerOneRight = new Text({ text: "D Right", style: textStyle });
    playerOneRight.x = gameWidth / 15;
    playerOneRight.y = playerOneJump.y + gameHeight / 30;
    this.container.addChild(playerOneRight);

    const playerTwoJump = new Text({ text: `\u2191 Jump`, style: textStyle });
    playerTwoJump.x = gameWidth - gameWidth / 6;
    playerTwoJump.y = gameHeight - gameHeight / 10;
    this.container.addChild(playerTwoJump);

    const playerTwoLeft = new Text({ text: `\u2190 Left`, style: textStyle });
    playerTwoLeft.x = gameWidth - gameWidth / 6;
    playerTwoLeft.y = playerTwoJump.y - gameHeight / 30;
    this.container.addChild(playerTwoLeft);

    const playerTwoRight = new Text({ text: `\u2192 Right`, style: textStyle });
    playerTwoRight.x = gameWidth - gameWidth / 6;
    playerTwoRight.y = playerTwoJump.y + gameHeight / 30;
    this.container.addChild(playerTwoRight);

    const gameTitle = new Text({
      text: "H O P . L A",
      style: {
        fontSize: 70,
        align: "center",
        fill: 0xffffff,
        fontFamily: "2p",
      },
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
