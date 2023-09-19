import { Rocket } from "./modules/Rocket";
import "./style.scss";
import { CanvasSize } from "./utils/CanvasSize";
import Konva from "konva";

// const $canvas = document.getElementById("canvas") as HTMLCanvasElement;
// const ctx = $canvas.getContext("2d") as CanvasRenderingContext2D;
// const padding = 200;
// const canvasWidth = window.innerWidth - padding;
// const canvasHeight = window.innerHeight - padding;

// const rocket = new Rocket(new CanvasSize(canvasWidth, canvasHeight));

// $canvas.width = canvasWidth;
// $canvas.height = canvasHeight;

// animate();

// function animate() {
//   rocket.update();
//   ctx.save();
//   ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

//   rocket.draw(ctx);
//   rocket.fuel.draw(ctx);

//   // requestAnimationFrame(animate);
// }

// setTimeout(() => {
//   console.log(rocket.coor);
//   console.log(rocket.size);

//   ctx.translate(-20, -20);
//   animate();
// }, 1000);

const width = window.innerWidth;
const height = window.innerHeight;

const stage = new Konva.Stage({
  container: "container",
  width: width,
  height: height,
});

const layer = new Konva.Layer();
stage.add(layer);

const rocket = new Rocket(layer);

const anim = new Konva.Animation(() => {
  rocket.update();
  rocket.draw();
}, layer);

anim.start();
