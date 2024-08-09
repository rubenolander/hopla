import { Game } from "./src/game/Game";
import { Assets } from "pixi.js";

Assets.load([
  "../sprites/background.png",
  "../sprites/girder.png",
  "../sprites/dodoIdle.png",
  "../sprites/dodoJump.png",
  "../sprites/dodoMoveOne.png",
  "../sprites/dodoMoveTwo.png",
  "../sprites/ostrichIdle.png",
  "../sprites/ostrichJump.png",
  "../sprites/ostrichMoveOne.png",
  "../sprites/ostrichMoveTwo.png",
]).then(() => {
  const button = document.createElement("button");
  button.textContent = "CLICK TO START H O P . L A";
  document.querySelector(".game").appendChild(button);
  button.addEventListener("click", () => {
    //Initialize the PIXI application and load physics engine.
    new Game();
    document.querySelector(".game").removeChild(button);
  });
});
