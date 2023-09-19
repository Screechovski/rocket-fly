import Konva from "konva";
import { Coor } from "../utils/Coor";
import { UpdateProps } from "../utils/CamvasElement";

export class Planet {
  coor: Coor;
  R: number;
  r: number;
  M: number;
  canvas: Konva.Circle;
  canvasGravity: Konva.Circle;
  layer: Konva.Layer;
  g: number;

  constructor(layer: Konva.Layer, c: Coor, r: number, M: number) {
    this.coor = c;
    this.r = r;
    this.R = r * 5;
    this.M = M;
    this.g = M / Math.pow(r, 2);

    this.canvas = new Konva.Circle({
      radius: this.r,
      x: this.coor.x,
      y: this.coor.y,
      fill: "#473a22",
      stroke: "#3b2000",
      strokeWidth: 2,
      offset: new Coor(this.r),
      opacity: 0.5,
    });

    this.canvasGravity = new Konva.Circle({
      radius: this.R,
      x: this.coor.x,
      y: this.coor.y,
      fill: "#c2fcef",
      opacity: 0.2,
    });

    this.layer = layer;

    this.layer.add(this.canvasGravity);
    this.layer.add(this.canvas);
  }

  getFriction(coor: Coor): UpdateProps {
    let res: UpdateProps = {
      x: 0,
      y: 0,
      airFriction: 0,
    };
    let angleT = Math.atan2(coor.y - this.coor.y, coor.x - this.coor.x);

    // √((x - 2)² + (y - (-1))²)
    const spaceBetweenCenter = Math.sqrt(
      Math.pow(coor.x - this.coor.x, 2) + Math.pow(coor.y - this.coor.y, 2)
    );

    if (this.R < spaceBetweenCenter) {
      return res;
    }
    if (spaceBetweenCenter < this.R) {
      res.airFriction = 0.001;
      res.x = 0.003 * Math.cos(angleT);
      res.y = 0.003 * Math.sin(angleT);

      return res;
    }
    return res;
  }

  draw() {}
}
