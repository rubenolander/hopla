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
/* button.addEventListener("click", async () => {
  // Display a loading indicator or perform other setup tasks if needed.


  try {
    // Initialize the PIXI application and load the physics engine.
    const game = await initializeGame();

    // Remove the button after the game is successfully initialized.
    gameWindow.removeChild(button);
  } catch (error) {
    console.error("Error initializing the game:", error);
    // Handle the error if initialization fails.
  }
});

// Function to initialize the game and return a promise.
function initializeGame() {
  return new Promise((resolve, reject) => {
    // Perform any necessary setup tasks here.

    // Create the PIXI application and load the physics engine.
    const game = new Game();

    // You may want to perform additional asynchronous tasks here.

    // Resolve the promise to indicate that the game is successfully initialized.
    resolve(game);
  });
} */
