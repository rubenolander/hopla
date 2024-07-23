import Matter from "matter-js";
import MatterWrap from "matter-wrap";
import { Application } from "pixi.js";

class GameApplication {
  constructor() {
    this.gameContainer = document.querySelector(".game");
    this.gameHeight = this.gameContainer.offsetHeight;
    this.gameWidth = this.gameContainer.offsetWidth;
  }

  run = async () => {
    if (this.app && this.app.canvas) {
      this.gameContainer.removeChild(this.app.canvas);
    }

    this.app = new Application();
    await this.app.init({
      antialias: true,
      resizeTo: this.gameContainer,
      useBackBuffer: true,
    });
    this.gameContainer.appendChild(this.app.canvas);
    await this.createPhysics();
  };

  createPhysics = async () => {
    this.physics = Matter.Engine.create();
    Matter.use(MatterWrap);

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, this.physics);
  };

  add(item) {
    this.app.stage.addChild(item);
  }

  remove(item) {
    this.app.stage.removeChild(item);
  }
}

export const App = new GameApplication();
