import Matter from "matter-js";
import * as PIXI from "pixi.js";

class Application {
  run() {
    this.app = new PIXI.Application({
      autoResize: true,
      resizeTo: document.querySelector(".game"),
    });
    document.querySelector(".game").appendChild(this.app.view);

    this.createPhysics();
  }

  createPhysics() {
    this.physics = Matter.Engine.create();
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, this.physics);
  }

  add(item) {
    this.app.stage.addChild(item);
  }
}

export const App = new Application();
