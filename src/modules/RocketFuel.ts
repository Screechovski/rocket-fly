import { CanvasElement } from "../utils/CamvasElement";

export class RocketFuel implements CanvasElement {
  liters: number;
  tankWeight = 0.1;
  literWeight = 0.01;
  maxLitters: number;

  constructor(liters: number){
    this.maxLitters = liters;
    this.liters = liters;
  }

  get weight(){
    return this.tankWeight + this.literWeight * this.liters;
  }

  get literPercent(){
    return parseFloat((this.liters / this.maxLitters).toFixed(2))
  }

  get hasFuel(){
    return this.liters > 0;
  }

  draw(ctx: CanvasRenderingContext2D){
    const height = 80 * this.literPercent

    ctx.fillRect(10, 90, 20, -height)
  }

  update(){
    this.liters -= 0.2;
  }
}