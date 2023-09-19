export type UpdateProps = {
  x: number;
  y: number;
  airFriction: number;
};

export interface CanvasElement {
  update(friction?: UpdateProps): void;
}
