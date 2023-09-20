export class Controls {
  forward: boolean;
  left: boolean;
  right: boolean;
  reverse: boolean;
  pause: boolean;

  constructor() {
    this.forward = false;
    this.left = false;
    this.right = false;
    this.reverse = false;
    this.pause = false;

    this.addKeyboardListeners();
  }

  private addKeyboardListeners() {
    window.addEventListener("keydown", (event) => {
      switch (event.code) {
        case "ArrowLeft":
        case "KeyA":
          this.left = true;
          break;
        case "ArrowRight":
        case "KeyD":
          this.right = true;
          break;
        case "ArrowUp":
        case "KeyW":
          this.forward = true;
          break;
        case "ArrowDown":
        case "KeyS":
          this.reverse = true;
          break;
        case " ": {
          this.pause = true;
          break;
        }
      }
    });
    window.addEventListener("keyup", (event) => {
      switch (event.code) {
        case "ArrowLeft":
        case "KeyA":
          this.left = false;
          break;
        case "ArrowRight":
        case "KeyD":
          this.right = false;
          break;
        case "ArrowUp":
        case "KeyW":
          this.forward = false;
          break;
        case "ArrowDown":
        case "KeyS":
          this.reverse = false;
          break;
        case " ": {
          this.pause = false;
          break;
        }
      }
    });
  }
}
