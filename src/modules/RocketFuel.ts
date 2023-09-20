import Konva from "konva";
import { CanvasElement } from "../utils/CamvasElement";

export class RocketFuel implements CanvasElement {
  liters: number;
  tankWeight = 0.1;
  literWeight = 0.01;
  maxLitters: number;
  canvas: Konva.Rect;
  layer: Konva.Layer;

  constructor(layer: Konva.Layer, liters: number) {
    this.maxLitters = liters;
    this.liters = liters;
    this.layer = layer;

    this.canvas = new Konva.Rect({
      x: 20,
      y: 20,
      height: 100,
      width: 30,
      fill: "green",
    });

    this.layer.add(this.canvas);
  }

  get weight() {
    return this.tankWeight + this.literWeight * this.liters;
  }

  get literPercent() {
    return parseFloat((this.liters / this.maxLitters).toFixed(2));
  }

  get hasFuel() {
    return this.liters > 0;
  }

  draw() {
    const height = 100 * this.literPercent;

    this.canvas.height(height);
    this.canvas.y(120 - height);
  }

  update() {
    this.liters -= 0.1;
  }
}
