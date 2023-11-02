import Matter from "matter-js";
import * as PIXI from "pixi.js";

document.addEventListener("DOMContentLoaded", (event) => {
  /*--------------------------
  Setup
  --------------------------*/

  // Matter Modules
  const Engine = Matter.Engine;
  const World = Matter.World;
  const Bodies = Matter.Bodies;

  // Scene Container
  const sceneContainer = document.querySelector(".scene");
  const canvasWidth = sceneContainer.offsetWidth;
  const canvasHeight = sceneContainer.offsetHeight;

  /*--------------------------
  Engine
  ---
  Setup the Matter engine. This is what the Matter bodies will run in.
  --------------------------*/

  const engine = Engine.create();

  /*--------------------------
  Pixi Data
  --------------------------*/

  const images = [
    {
      src: "https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
      initialPosition: {
        x: 300,
        y: 180,
      },
      width: 200,
      height: 100,
    },
    {
      src: "https://images.unsplash.com/photo-1526312426976-f4d754fa9bd6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
      initialPosition: {
        x: 300,
        y: 180,
      },
      width: 200,
      height: 100,
    },
    {
      src: "https://images.unsplash.com/photo-1534214526114-0ea4d47b04f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
      initialPosition: {
        x: 500,
        y: 180,
      },
      width: 200,
      height: 100,
    },
  ];

  /*--------------------------
  Scene Objects
  --------------------------*/

  // Array of objects we want to track in the scene. This will be populated as we create our bodies and sprites from the images.
  const sceneObjects = [];

  /*--------------------------
  Setup Walls
  ---
  Walls will keep our bodies and sprites within a confined area.
  --------------------------*/
  const wallBottom = Bodies.rectangle(
    canvasWidth / 2,
    canvasHeight,
    canvasWidth,
    10,
    {
      isStatic: true,
    }
  );

  // Add Matter walls to the world. This will keep the bodies within certain parameters.
  World.add(engine.world, [wallBottom]);

  /*--------------------------
  Pixi
  --------------------------*/

  // Setup Pixi renderer to match the same size as the Matter world.
  const app = new PIXI.Application({
    backgroundAlpha: 0,
    resizeTo: sceneContainer,
  });

  // Put the Pixi apps canvas into the scene container.
  document.querySelector(".scene").appendChild(app.view);

  /*--------------------------
  Create Scene Object
  --------------------------*/

  function createSceneObject(image) {
    // Matter Body
    const imageBody = Bodies.rectangle(
      image.initialPosition.x,
      image.initialPosition.y,
      image.width,
      image.height,
      {
        restitution: 0.8,
      }
    );
    World.addBody(engine.world, imageBody);

    // Pixi Sprite
    // The sprite can be anything from the Pixi api. Video, image, make it into a circle, mask it, etc. You just need to make sure the proper anchor point is set, its added to the stage and that it follows the body in our pixi app ticker.
    const imageSprite = new PIXI.Sprite.from(image.src);
    imageSprite.width = image.width;
    imageSprite.height = image.height;
    imageSprite.position;
    imageSprite.anchor.set(0.5, 0.5);
    app.stage.addChild(imageSprite);

    // Add the complete scene object (body and sprite) to our array of objects. We'll track those objects in the pixi frame updates (see app.ticker below).
    sceneObjects.push({
      body: imageBody,
      sprite: imageSprite,
    });
  }

  /*--------------------------
  Pixi Frame Updates
  --------------------------*/

  app.ticker.add(() => {
    sceneObjects.forEach((object) => {
      // Make all pixi sprites follow the position and rotation of their body.
      object.sprite.position = object.body.position;
      object.sprite.rotation = object.body.angle;
    });
  });

  /*--------------------------
  Run
  ---
  This is where we create the initial objects and start the engine.
  --------------------------*/

  // Create the bodies and sprites.
  images.forEach((image) => {
    createSceneObject(image);
  });

  // Run the Matter engine. This continuously updates the Matter.Engine. It ensures we can listen for the updates on each tick and move the Pixi objects with Matter bodies (see app.ticker function).
  Matter.Runner.run(engine);
});
