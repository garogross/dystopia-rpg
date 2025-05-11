import { IGame } from './IGame';
import { HalfCourt } from "./HalfCourt";

export class Game  implements IGame {
  public canvas: HTMLCanvasElement;
  public context: CanvasRenderingContext2D | null;
  public width: number;
  public height: number;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;
  }

  drawCourts() {
    if (this.context) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    new HalfCourt(this.canvas, "left").draw(this.context);
    new HalfCourt(this.canvas, "right").draw(this.context);
  }
}



