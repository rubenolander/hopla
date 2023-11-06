import { App } from "./src/game/PixiApp";
import { Game } from "./src/game/Game";
import Matter from "matter-js";
import * as PIXI from "pixi.js";

//Initialize the PIXI application and load physics engine.
const game = new Game();

// Create two players and add values to these friends start positions.

/* const playerOneIdle = PIXI.Texture.from("../src/ostrichIdle.png");
const playerOneLeft = PIXI.Texture.from("../src/ostrichLeft.png");
const playerOneRight = PIXI.Texture.from("../src/ostrichRight.png");
const playerOneJump = PIXI.Texture.from("../src/ostrichFlightlessBird.png"); */

//EventListeners for button presses.
