import { Game } from "./src/game/Game";

const gameWindow = document.querySelector(".game");
const button = document.createElement("button");
button.textContent = "CLICK TO START H O P L A";
gameWindow.appendChild(button);

button.addEventListener("click", () => {
  //Initialize the PIXI application and load physics engine.
  const game = new Game();
  gameWindow.removeChild(button);
});
