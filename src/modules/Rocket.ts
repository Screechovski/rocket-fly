import { Size } from "../utils/Size";
import { Coor } from "../utils/Coor";
import { Controls } from "../utils/Controls";
import { RocketFuel } from "./RocketFuel";
import { CanvasElement, UpdateProps } from "../utils/CamvasElement";
import Konva from "konva";

export class Rocket implements CanvasElement {
  coor: Coor;
  speed: Coor;
  size: Size;
  image: HTMLImageElement;
  controls: Controls;
  fuel: RocketFuel;
  rocketCanvas: Konva.Image;
  layer: Konva.Layer;
  wasStart = false;
  renderFair = false;
  acceleration = 0.01;
  areaFriction = 0.001;
  friction = 0.003;
  angle = 0;

  constructor(layer: Konva.Layer) {
    this.size = new Size(40);
    this.coor = new Coor(
      (layer.width() - this.size.width) / 2,
      (layer.height() - this.size.height) / 2
    );
    this.speed = new Coor(0);
    this.controls = new Controls();
    this.fuel = new RocketFuel(layer, 100);
    this.image = document.getElementById("rocket_image") as HTMLImageElement;
    this.wasStart = false;

    this.rocketCanvas = new Konva.Image({
      image: this.image,
      height: this.size.height,
      width: this.size.width,
      x: this.coor.x,
      y: this.coor.y,
      fill: "green",
    });

    this.rocketCanvas.offsetX(this.size.height / 2);
    this.rocketCanvas.offsetY(this.size.width);

    this.layer = layer;
    this.layer.add(this.rocketCanvas);
  }

  private getRadianAngle() {
    return this.angle * (Math.PI / 180);
  }

  get isBottom() {
    return (
      this.rocketCanvas.position().y - this.acceleration > this.layer.height()
    );
  }

  get avgModuleSpeed() {
    const speed = Math.max(Math.abs(this.speed.x), Math.abs(this.speed.y));

    if (speed > 1) {
      return 1;
    }

    return speed;
  }

  update(friction: UpdateProps) {
    if (this.controls.right) {
      this.angle += 1;

      if (this.angle > 180) {
        this.angle = -180;
      }
    }

    if (this.controls.left) {
      this.angle -= 1;

      if (this.angle < -180) {
        this.angle = 180;
      }
    }

    this.renderFair = this.controls.forward;

    if (this.controls.forward) {
      this.speed.x += Math.sin(this.getRadianAngle()) * this.acceleration;
      this.speed.y += Math.cos(this.getRadianAngle()) * this.acceleration;
    }

    if (this.speed.x !== 0) {
      if (this.speed.x < 0) {
        this.speed.x += this.areaFriction;
      } else {
        this.speed.x -= this.areaFriction;
      }
    }

    this.speed.y = this.speed.y - (this.areaFriction + this.friction);

    if (this.controls.pause) {
      this.speed.x = 0;
      this.speed.y = 0;
    }

    this.coor.x += this.speed.x;
    this.coor.y -= this.speed.y;

    if (this.isBottom) {
      this.coor.y = this.layer.height() - this.acceleration;
      this.speed.y = 0;
    }
  }

  draw() {
    this.rocketCanvas.rotation(this.angle);
    this.rocketCanvas.y(this.coor.y);
    this.rocketCanvas.x(this.coor.x);
  }
}
