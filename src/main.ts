import { Rocket } from "./modules/Rocket";
import "./style.scss";
import Konva from "konva";
import { Coor } from "./utils/Coor";
import { Planet } from "./modules/Planet";
import { UpdateProps } from "./utils/CamvasElement";

const width = window.innerWidth;
const height = window.innerHeight;

const stage = new Konva.Stage({
  container: "container",
  width: width,
  height: height,
});
const layer = new Konva.Layer();

stage.add(layer);

const rocket = new Rocket(
  layer,
  new Coor(layer.width() - 50, layer.height() - 50)
);
const planet1 = new Planet(
  layer,
  new Coor(layer.width() / 2, layer.height() / 2),
  100,
  30
);

function sumFriction(...args: UpdateProps[]): UpdateProps {
  return args.reduce<UpdateProps>(
    (prev, cur) => {
      return {
        x: prev.x + cur.x,
        y: prev.y + cur.y,
        airFriction: prev.airFriction + cur.airFriction,
      };
    },
    {
      x: 0,
      y: 0,
      airFriction: 0,
    }
  );
}

const anim = new Konva.Animation(() => {
  const frictions = sumFriction(planet1.getFriction(rocket.coor));

  rocket.update(frictions);
  rocket.draw();
}, layer);

anim.start();
