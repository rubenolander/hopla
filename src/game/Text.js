import { App } from "./Application";

import { Container, Text } from "pixi.js";

export class GameText {
  constructor() {
    this.container = new Container();
    App.add(this.container);
  }

  async printStartingTexts() {
    let controlsTextStyle = {
      fontFamily: "2p",
      fontSize: 24,
      align: "center",
      fill: 0xffffff,
    };

    const playerOneJump = new Text({
      text: "W Jump",
      style: controlsTextStyle,
    });
    playerOneJump.x = App.gameWidth / 15;
    playerOneJump.y = App.gameHeight - App.gameHeight / 10;
    this.container.addChild(playerOneJump);

    const playerOneLeft = new Text({
      text: "A Left",
      style: controlsTextStyle,
    });
    playerOneLeft.x = App.gameWidth / 15;
    playerOneLeft.y = playerOneJump.y - App.gameHeight / 30;
    this.container.addChild(playerOneLeft);

    const playerOneRight = new Text({
      text: "D Right",
      style: controlsTextStyle,
    });
    playerOneRight.x = App.gameWidth / 15;
    playerOneRight.y = playerOneJump.y + App.gameHeight / 30;
    this.container.addChild(playerOneRight);

    const playerTwoJump = new Text({
      text: `\u2191 Jump`,
      style: controlsTextStyle,
    });
    playerTwoJump.x = App.gameWidth - App.gameWidth / 6;
    playerTwoJump.y = App.gameHeight - App.gameHeight / 10;
    this.container.addChild(playerTwoJump);

    const playerTwoLeft = new Text({
      text: `\u2190 Left`,
      style: controlsTextStyle,
    });
    playerTwoLeft.x = App.gameWidth - App.gameWidth / 6;
    playerTwoLeft.y = playerTwoJump.y - App.gameHeight / 30;
    this.container.addChild(playerTwoLeft);

    const playerTwoRight = new Text({
      text: `\u2192 Right`,
      style: controlsTextStyle,
    });
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
  }

  printGameOverTexts(bodyName) {
    const style = {
      fontFamily: "2p",
      fontSize: 70,
      align: "center",
      fill: 0xffffff,
    };
    const gameOverText = new Text({
      text: `${bodyName} wins!`,
      style: style,
    });
    gameOverText.x = App.gameWidth / 2 - gameOverText.width / 2;
    gameOverText.y = App.gameHeight / 2;

    const restartText = new Text({
      text: 'Press "Y" to play again!',
      style: { ...style, fontSize: 60 },
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
