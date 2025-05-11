import { BaseCourt } from "./BaseCourt";
import { PositionLine } from "./PositionLine";
import { IGame } from "./IGame";

const SIDE_INCLINATION = 0.65;
const CENTER_INCLINATION = 0.96;
const LINES_COUNT = 3;

export class HalfCourt extends BaseCourt {
  public width: number;
  public topLeftPaleX: number = 0;

  constructor(canvas: HTMLCanvasElement, side: "left" | "right") {
    super(canvas, side,canvas.height );
    this.width = (canvas.width / 2) * 0.9;
    this.height = canvas.height;
    this.topLeftPaleX = side === "left" ? 0 : canvas.width - this.width;
  }

  draw(ctx: IGame["context"]) {
    if (!ctx) return;

    const x = this.topLeftPaleX;

    if (this.side === "right") {
      this.topLeftX = x;
      this.topRightX = this.width * (1 - SIDE_INCLINATION) + x;
      this.bottomRightX = x + this.width;
      this.bottomLeftX = x * (1 + (1 - CENTER_INCLINATION));
    } else {
      this.topLeftX = x + this.width * SIDE_INCLINATION;
      this.topRightX = x + this.width;
      this.bottomRightX = this.topRightX * CENTER_INCLINATION;
      this.bottomLeftX = x;
    }

    this.drawPath(ctx);

    this.drawLines(ctx);
  }

  drawLines(ctx: IGame["context"]) {
    const topWidth = (this.topRightX - this.topLeftX) / LINES_COUNT;
    const bottomWidth = (this.bottomRightX - this.bottomLeftX) / LINES_COUNT;

    for (let i = 0; i < LINES_COUNT; i++) {
      const positionIndex = i as PositionLine["positionIndex"];
      const line = new PositionLine(
        this.canvas,
        this.side,
        positionIndex,
        topWidth,
        bottomWidth,
        this.topLeftX,
        this.bottomLeftX,
        this.height,
        "space-around-top",
        3
      );

      line.draw(ctx);
    }
  }
}
