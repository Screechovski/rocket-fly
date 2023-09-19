import { Island } from "./modules/Island";
import { Rocket } from "./modules/Rocket";
import "./style.scss";
import Konva from "konva";
import { Coor } from "./utils/Coor";
import { Planet } from "./modules/Planet";

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
const planet1 = new Planet(layer, new Coor(250), 70, 0);

const anim = new Konva.Animation(() => {
  rocket.update();
  rocket.draw();
}, layer);

anim.start();
