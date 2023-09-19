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
  image_on: HTMLImageElement;
  image_off: HTMLImageElement;
  controls: Controls;
  fuel: RocketFuel;
  rocketCanvas: Konva.Image;
  layer: Konva.Layer;
  wasStart = false;
  renderFire = false;
  acceleration = 0.005;
  angle = 0;

  constructor(layer: Konva.Layer, place: Coor) {
    this.size = new Size(80, 17);
    this.coor = place;
    this.speed = new Coor(0);
    this.controls = new Controls();
    this.fuel = new RocketFuel(layer, 100);
    this.image_on = document.getElementById(
      "rocket_fire_on"
    ) as HTMLImageElement;
    this.image_off = document.getElementById(
      "rocket_fire_off"
    ) as HTMLImageElement;
    this.wasStart = false;

    this.rocketCanvas = new Konva.Image({
      image: this.image_off,
      height: this.size.height,
      width: this.size.width,
      x: this.coor.x,
      y: this.coor.y,
      fill: "gray",
    });

    this.rocketCanvas.offsetX(this.size.width / 2);
    this.rocketCanvas.offsetY(this.size.height / 2);

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
      this.angle += this.avgModuleSpeed * 0.9 + 0.1;

      if (this.angle > 180) {
        this.angle = -180;
      }
    }

    if (this.controls.left) {
      this.angle -= this.avgModuleSpeed * 0.9 + 0.1;

      if (this.angle < -180) {
        this.angle = 180;
      }
    }

    this.renderFire = this.controls.forward;

    if (this.controls.forward) {
      this.rocketCanvas.image(this.image_on);
      this.speed.x += Math.sin(this.getRadianAngle()) * this.acceleration;
      this.speed.y += Math.cos(this.getRadianAngle()) * this.acceleration;
    } else {
      this.rocketCanvas.image(this.image_off);
    }

    if (this.speed.x < 0) {
      this.speed.x += friction.airFriction;
    }
    if (this.speed.x > 0) {
      this.speed.x -= friction.airFriction;
    }
    if (this.speed.y < 0) {
      this.speed.y += friction.airFriction;
    }
    if (this.speed.y > 0) {
      this.speed.y -= friction.airFriction;
    }

    this.speed.y += friction.y;
    this.speed.x -= friction.x;

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
