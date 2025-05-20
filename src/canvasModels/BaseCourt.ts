import { IGame } from "./IGame";

export abstract class BaseCourt {
  canvas: HTMLCanvasElement;
  context: IGame["context"];
  public side: "left" | "right";
  public topLeftX: number = 0;
  public topRightX: number = 0;
  public bottomLeftX: number = 0;
  public bottomRightX: number = 0;
  public height: number;
  public y: number = 0;

  constructor(
    canvas: HTMLCanvasElement,
    context: IGame["context"],
    side: "left" | "right",
    height: number,
    y: number
  ) {
    this.canvas = canvas;
    this.context = context;
    this.side = side;
    this.height = height;
    this.y = y;
  }

  abstract draw(): void;

  drawPath() {
    if (!this.context) return;
    const ctx = this.context;
    const topY = this.y; // Adjust as needed

    const bottomY = this.height + this.y; // Adjust as needed
    ctx.beginPath();
    ctx.moveTo(this.topLeftX, topY);
    ctx.lineTo(this.topRightX, topY);
    ctx.lineTo(this.bottomRightX, bottomY);
    ctx.lineTo(this.bottomLeftX, bottomY);

    ctx.closePath();
  }
}
