import Matter from "matter-js";
import MatterWrap from "matter-wrap";
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
    Matter.use(MatterWrap);

    this.physics.gravity.y = 0.9;
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, this.physics);

    const delta = 1000 / 60;
    const subSteps = 3;
    const subDelta = delta / subSteps;

    (function run() {
      window.requestAnimationFrame(run);
      for (let i = 0; i < subSteps; i += 1) {
        Matter.Engine.update(App.physics, subDelta);
      }
    })();
  }

  add(item) {
    this.app.stage.addChild(item);
  }
}

export const App = new Application();
