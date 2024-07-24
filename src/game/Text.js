import { App } from "./Application";

import { Container, Text } from "pixi.js";

export class GameText {
  constructor() {
    this.textStyle = {
      fontFamily: "2p",
      fontSize: 24,
      align: "center",
      fill: 0xffffff,
    };
    this.container = new Container();
    App.add(this.container);
  }

  async printStartingTexts() {
    const gameTitle = new Text({
      text: "H O P . L A",
      style: { ...this.textStyle, fontSize: 70 },
    });
    gameTitle.x = App.gameWidth / 2 - gameTitle.width / 2;
    gameTitle.y = 300;
    this.container.addChild(gameTitle);

    const playerOneJump = new Text({
      text: "W Jump",
      style: this.textStyle,
    });
    playerOneJump.x = App.gameWidth / 15;
    playerOneJump.y = App.gameHeight - App.gameHeight / 10;
    this.container.addChild(playerOneJump);

    const playerOneLeft = new Text({
      text: "A Left",
      style: this.textStyle,
    });
    playerOneLeft.x = App.gameWidth / 15;
    playerOneLeft.y = playerOneJump.y - App.gameHeight / 30;
    this.container.addChild(playerOneLeft);

    const playerOneRight = new Text({
      text: "D Right",
      style: this.textStyle,
    });
    playerOneRight.x = App.gameWidth / 15;
    playerOneRight.y = playerOneJump.y + App.gameHeight / 30;
    this.container.addChild(playerOneRight);

    const playerTwoJump = new Text({
      text: `\u2191 Jump`,
      style: this.textStyle,
    });
    playerTwoJump.x = App.gameWidth - App.gameWidth / 6;
    playerTwoJump.y = App.gameHeight - App.gameHeight / 10;
    this.container.addChild(playerTwoJump);

    const playerTwoLeft = new Text({
      text: `\u2190 Left`,
      style: this.textStyle,
    });
    playerTwoLeft.x = App.gameWidth - App.gameWidth / 6;
    playerTwoLeft.y = playerTwoJump.y - App.gameHeight / 30;
    this.container.addChild(playerTwoLeft);

    const playerTwoRight = new Text({
      text: `\u2192 Right`,
      style: this.textStyle,
    });
    playerTwoRight.x = App.gameWidth - App.gameWidth / 6;
    playerTwoRight.y = playerTwoJump.y + App.gameHeight / 30;
    this.container.addChild(playerTwoRight);
  }

  printGetReadyTexts() {
    const getReadyText = new Text({
      text: "Get ready! Starting ...",
      style: this.textStyle,
    });
    getReadyText.x = App.gameWidth / 2 - getReadyText.width / 2;
    getReadyText.y = App.gameHeight - App.gameHeight / 10;
    this.container.addChild(getReadyText);
    setTimeout(() => {
      getReadyText.text = "^^ GO! ^^";
      getReadyText.x = App.gameWidth / 2 - getReadyText.width / 2;
    }, 3500);
  }

  printGameOverTexts(bodyName) {
    const gameOverText = new Text({
      text: `${bodyName} wins!`,
      style: { ...this.textStyle, fontSize: 72 },
    });
    gameOverText.x = App.gameWidth / 2 - gameOverText.width / 2;
    gameOverText.y = App.gameHeight / 2;

    const restartText = new Text({
      text: 'Press "Y" to play again!',
      style: { ...this.textStyle, fontSize: 60 },
    });
    restartText.x = App.gameWidth / 2 - restartText.width / 2;
    restartText.y = 5;

    this.container.addChild(gameOverText, restartText);
  }

  move(offset) {
    this.container.y -= offset;
  }
  destroy() {
    this.container.removeChildren();
    App.remove(this.container);
  }
}
