import { BaseCourt } from "./BaseCourt";
import { IGame } from "./IGame";
import { PostitionPlace } from "./PositionPlace";

const POSITION_LINE_COLORS = ["#EA030859", "#EAB40359", "#03EA0359"] as const;

export class PositionLine extends BaseCourt {
  public positionIndex: 0 | 1 | 2;
  private gridType:
    | "space-around-top"
    | "space-around-bottom"
    | "space-between";
  private charactersCount: number;

  constructor(
    canvas: HTMLCanvasElement,
    side: "left" | "right",
    positionIndex: 0 | 1 | 2,
    topWidth: number,
    bottomWidth: number,
    parentTopLeftX: number,
    parentBottomLeftX: number,
    height: number,
    gridType: PositionLine["gridType"],
    charactersCount: PositionLine["charactersCount"]
  ) {
    super(canvas, side, height);
    this.positionIndex = positionIndex;

    this.topLeftX = parentTopLeftX + topWidth * positionIndex;
    this.topRightX = parentTopLeftX + topWidth * (positionIndex + 1);
    this.bottomLeftX = parentBottomLeftX + bottomWidth * positionIndex;
    this.bottomRightX = parentBottomLeftX + bottomWidth * (positionIndex + 1);
    this.gridType = gridType;
    this.charactersCount = charactersCount;
  }

  override draw(ctx: IGame["context"]) {
    if (!ctx) return;

    const colors =
      this.side === "right"
        ? [...POSITION_LINE_COLORS].reverse()
        : POSITION_LINE_COLORS;

    ctx.fillStyle = colors[this.positionIndex];
    this.drawPath(ctx);
    ctx.fill();

    this.drawPlaces(ctx);
  }

  private interpolateX(topX: number, bottomX: number, y: number): number {
    const t = y / this.height;
    return topX + (bottomX - topX) * t;
  }

  private get3DEffectY(index: number, count: number, height: number): number {
    const virtualCount = count === 1 ? 3 : count;
    const virtualIndex = count === 1 ? 1 : index;
    const t = virtualIndex / (virtualCount - 1); // normalized [0..1]
    const eased = Math.pow(t, 1.5);
    return eased * height;
  }

  private getSpaceAround3DEffectY(
    index: number,
    count: number,
    height: number,
    isBottom?: boolean
  ): number {
    const virtualCount = count === 1 ? 2 : count;
    const virtualIndex = count === 1 ? (isBottom ? 1 : 0) : index;

    const step = height / virtualCount;
    const baseY = step * virtualIndex + step / 2;
    const t = baseY / height;

    const eased = Math.pow(t, 1.5);
    return eased * height;
  }

  drawPlaces(ctx: IGame["context"]) {
    // this.drawPlace(ctx, "center", this.height * 0.3);
    // this.drawPlace(ctx, "top");
    // this.drawPlace(ctx, "bottom");

    for (let i: number = 0; i < this.charactersCount; i++) {
      if (this.gridType === "space-between") {
        if (this.charactersCount === 1) {
          const y = this.get3DEffectY(i, this.charactersCount, this.height);

          this.drawPlace(ctx, "center", y);
        } else {
          if (!i) {
            this.drawPlace(ctx, "top");
          } else if (i === this.charactersCount - 1) {
            this.drawPlace(ctx, "bottom");
          } else {
            const y = this.get3DEffectY(i, this.charactersCount, this.height);

            this.drawPlace(ctx, "center", y);
          }
        }
      }
      if (this.gridType.startsWith("space-around")) {
        // const count =
        //   this.charactersCount - 1 < 2 ? 2 : this.charactersCount - 1;
        // const startAreaY = (this.height / count) * i;
        // const endAreaY = (this.height / count) * (i + 1);
        // const y = (startAreaY + endAreaY) / 2;

        const isBottomGridType = this.gridType.endsWith("bottom");
        const y = this.getSpaceAround3DEffectY(
          i,
          this.charactersCount,
          this.height,
          isBottomGridType
        );
        this.drawPlace(ctx, "center", y);
      }
    }
  }
  private drawPlace(
    ctx: IGame["context"],
    position: "top" | "bottom" | "center",
    y: number = 0
  ) {
    switch (position) {
      case "top": {
        y = y || 0;
        break;
      }
      case "bottom": {
        y = y || this.height;
        break;
      }
      case "center": {
        y = y || this.height * 0.5;
        break;
      }
    }
    const topLeftX = this.interpolateX(this.topLeftX, this.bottomLeftX, y);
    const topRightX = this.interpolateX(this.topRightX, this.bottomRightX, y);

    const topWidth = topRightX - topLeftX;
    const height = topWidth * 0.3; // keep it a circle
    let yPosition = 0;
    let yBottomPosition = 0;

    switch (position) {
      case "top": {
        y = 0;
        yBottomPosition = y + height;
        yPosition = y;
        break;
      }
      case "bottom": {
        y = this.height;

        yBottomPosition = y - height;
        yPosition = yBottomPosition;
        break;
      }
      case "center": {
        yPosition = y - height / 2;
        break;
      }
    }
    const bottomLeftX = this.interpolateX(
      this.topLeftX,
      this.bottomLeftX,
      yBottomPosition
    );
    const bottomRightX = this.interpolateX(
      this.topRightX,
      this.bottomRightX,
      yBottomPosition
    );
    const bottomWidth = bottomRightX - bottomLeftX;
    const width =
      position === "center" ? topWidth : (topWidth + bottomWidth) / 2;
    const leftX =
      position === "center" ? topLeftX : (topLeftX + bottomLeftX) / 2;
    const place = new PostitionPlace(width, height, leftX, yPosition);
    place.draw(ctx);
  }
}
