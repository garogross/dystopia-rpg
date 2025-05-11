import { IGame } from "./IGame";

export abstract class BaseCourt {
  canvas: HTMLCanvasElement;
  public side: "left" | "right";
  public topLeftX: number = 0;
  public topRightX: number = 0;
  public bottomLeftX: number = 0;
  public bottomRightX: number = 0;
  public height: number;
  public y: number = 0;

  constructor(
    canvas: HTMLCanvasElement,
    side: "left" | "right",
    height: number,
  ) {
    this.canvas = canvas;
    this.side = side;
    this.height = height;
  }

  abstract draw(ctx: IGame["context"]): void;

  drawPath(ctx: IGame["context"]) {
    if (!ctx) return;

    const topY = 0; // Adjust as needed
    const bottomY = this.canvas.height; // Adjust as needed
    ctx.beginPath();
    ctx.moveTo(this.topLeftX, topY);
    ctx.lineTo(this.topRightX, topY);
    ctx.lineTo(this.bottomRightX, bottomY);
    ctx.lineTo(this.bottomLeftX, bottomY);

    ctx.closePath();
  }
}
