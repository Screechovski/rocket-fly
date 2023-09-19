import Konva from "konva";
import { Coor } from "../utils/Coor";

export class Planet {
  coor: Coor;
  r: number; // 6378 km
  M: number; // 5974200000000000000000000 килограмма
  canvas: Konva.Circle;
  canvasGravity: Konva.Circle;
  layer: Konva.Layer;

  constructor(layer: Konva.Layer, c: Coor, r: number, M: number) {
    this.coor = c;
    this.r = r;
    this.M = M;

    this.canvas = new Konva.Circle({
      radius: this.r,
      x: this.coor.x,
      y: this.coor.y,
      fill: "#473a22",
      stroke: "#3b2000",
      strokeWidth: 2,
      offset: new Coor(this.r),
      opacity: 1,
    });

    this.canvasGravity = new Konva.Circle({
      radius: this.r * 2,
      x: this.coor.x,
      y: this.coor.y,
      fill: "#c2fcef",
      opacity: 0.2,
    });

    this.layer = layer;

    this.layer.add(this.canvasGravity);
    this.layer.add(this.canvas);
  }

  draw() {}
}
