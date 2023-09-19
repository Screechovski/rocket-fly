export class Coor {
  private _x: number;
  private _y: number;

  constructor(x: number, y: number);
  constructor(x: number);
  constructor(x: number, y?: number) {
    if (y === undefined) {
      this._y = x;
    } else {
      this._y = y;
    }
    this._x = x;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  set x(val: number) {
    if (Number.isNaN(val)) throw new Error("Coor: val is nan");
    this._x = val;
  }

  set y(val: number) {
    if (Number.isNaN(val)) throw new Error("Coor: val is nan");
    this._y = val;
  }
}
