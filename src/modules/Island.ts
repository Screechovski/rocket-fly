import Konva from "konva";
import { Size } from "../utils/Size";

export class Island {
  layer: Konva.Layer;
  size: Size;
  airSize: Size;

  constructor(layer: Konva.Layer) {
    this.layer = layer;
    this.size = new Size(20, layer.width());
    this.airSize = new Size(100, layer.width());
  }

  draw() {
    const rect = new Konva.Rect({
      x: 0,
      y: this.layer.height() - this.size.height,
      width: this.size.width,
      height: this.size.height,
      fill: "gray",
      opacity: 0.5,
    });
    const air = new Konva.Rect({
      x: 0,
      y: this.layer.height() - this.size.height - this.airSize.height,
      width: this.airSize.width,
      height: this.airSize.height,
      fill: "gray",
      opacity: 0.2,
    });
    // add the shape to the layer
    this.layer.add(rect);
    this.layer.add(air);
  }
}
