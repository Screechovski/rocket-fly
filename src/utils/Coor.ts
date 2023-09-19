export class Coor {
  x: number;
  y: number;

  constructor(x: number, y: number);
  constructor(x: number);
  constructor(x: number, y?: number) {
    if (y === undefined) {
      this.y = x;
    } else {
      this.y = y;
    }
    this.x = x;
  }
}
