import { Coor } from "./Coor";

type UpdateProps = Coor & {
  airFriction: number;
};

export interface CanvasElement {
  update(friction?: UpdateProps): void;
}
