import { Game } from "./src/game/Game";
import { Assets } from "pixi.js";

Assets.load("../sprites/background.png");
Assets.load("../sprites/girder.png");
Assets.load("../sprites/dodoIdle.png");
Assets.load("../sprites/dodoJump.png");
Assets.load("../sprites/dodoLeft.png");
Assets.load("../sprites/dodoRight.png");
Assets.load("../sprites/ostrichIdle.png");
Assets.load("../sprites/ostrichJump.png");
Assets.load("../sprites/ostrichLeft.png");
Assets.load("../sprites/ostrichRight.png");

const gameWindow = document.querySelector(".game");
const button = document.createElement("button");
button.textContent = "CLICK TO START H O P . L A";
gameWindow.appendChild(button);
button.addEventListener("click", () => {
  //Initialize the PIXI application and load physics engine.
  const game = new Game();
  gameWindow.removeChild(button);
});
