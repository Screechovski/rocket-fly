export class Size {
  height: number;
  width: number;

  constructor(h: number, w: number);
  constructor(h: number);
  constructor(h: number, w?: number) {
    if (w === undefined) {
      this.width = h;
    } else {
      this.width = w;
    }
    this.height = h;
  }
}
