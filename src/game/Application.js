import Matter from "matter-js";
import MatterWrap from "matter-wrap";
import { Application } from "pixi.js";

class GameApplication {
  run = async () => {
    this.app = new Application();
    await this.app.init({
      antialias: true,
      resizeTo: document.querySelector(".game"),
      useBackBuffer: true,
    });
    document.querySelector(".game").appendChild(this.app.canvas);
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
}

export const App = new GameApplication();
