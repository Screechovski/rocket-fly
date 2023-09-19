export class Size {
  private _h: number;
  private _w: number;

  constructor(h: number, w: number);
  constructor(h: number);
  constructor(h: number, w?: number) {
    if (w === undefined) {
      this._w = h;
    } else {
      this._w = w;
    }
    this._h = h;
  }

  get height() {
    return this._h;
  }

  set height(val: number) {
    if (Number.isNaN(val)) throw new Error("Size: val is nan");
    this._h = val;
  }

  get width() {
    return this._w;
  }

  set width(val: number) {
    if (Number.isNaN(val)) throw new Error("Size: val is nan");
    this._w = val;
  }
}
