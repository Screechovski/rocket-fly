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
    document.onkeydown = (event) => {
      console.log(event.key);

      switch (event.key) {
        case "ArrowLeft":
        case "a":
          this.left = true;
          break;
        case "ArrowRight":
        case "d":
          this.right = true;
          break;
        case "ArrowUp":
        case "w":
          this.forward = true;
          break;
        case "ArrowDown":
        case "s":
          this.reverse = true;
          break;
        case " ": {
          this.pause = true;
          break;
        }
      }
    };
    document.onkeyup = (event) => {
      switch (event.key) {
        case "ArrowLeft":
        case "a":
          this.left = false;
          break;
        case "ArrowRight":
        case "d":
          this.right = false;
          break;
        case "ArrowUp":
        case "w":
          this.forward = false;
          break;
        case "ArrowDown":
        case "s":
          this.reverse = false;
          break;
        case " ": {
          this.pause = false;
          break;
        }
      }
    };
  }
}
