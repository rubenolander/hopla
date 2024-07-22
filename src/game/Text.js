import { App } from "./Application";

import { Container, Text } from "pixi.js";

export class InfoText {
  constructor() {
    this.container = new Container();
    this.addText();
  }

  async addText() {
    let textStyle = {
      fontFamily: "2p",
      fontSize: 24,
      align: "center",
      fill: 0xffffff,
    };

    const playerOneJump = new Text({ text: "W Jump", style: textStyle });
    playerOneJump.x = App.gameWidth / 15;
    playerOneJump.y = App.gameHeight - App.gameHeight / 10;
    this.container.addChild(playerOneJump);

    const playerOneLeft = new Text({ text: "A Left", style: textStyle });
    playerOneLeft.x = App.gameWidth / 15;
    playerOneLeft.y = playerOneJump.y - App.gameHeight / 30;
    this.container.addChild(playerOneLeft);

    const playerOneRight = new Text({ text: "D Right", style: textStyle });
    playerOneRight.x = App.gameWidth / 15;
    playerOneRight.y = playerOneJump.y + App.gameHeight / 30;
    this.container.addChild(playerOneRight);

    const playerTwoJump = new Text({ text: `\u2191 Jump`, style: textStyle });
    playerTwoJump.x = App.gameWidth - App.gameWidth / 6;
    playerTwoJump.y = App.gameHeight - App.gameHeight / 10;
    this.container.addChild(playerTwoJump);

    const playerTwoLeft = new Text({ text: `\u2190 Left`, style: textStyle });
    playerTwoLeft.x = App.gameWidth - App.gameWidth / 6;
    playerTwoLeft.y = playerTwoJump.y - App.gameHeight / 30;
    this.container.addChild(playerTwoLeft);

    const playerTwoRight = new Text({ text: `\u2192 Right`, style: textStyle });
    playerTwoRight.x = App.gameWidth - App.gameWidth / 6;
    playerTwoRight.y = playerTwoJump.y + App.gameHeight / 30;
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
    gameTitle.x = App.gameWidth / 2 - gameTitle.width / 2;
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
