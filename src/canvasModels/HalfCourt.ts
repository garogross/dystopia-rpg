import { BaseCourt } from "./BaseCourt";
import { PositionLine } from "./PositionLine";
import { IGame } from "./IGame";

const SIDE_INCLINATION = 0.65;
const CENTER_INCLINATION = 0.96;
const LINES_COUNT = 3;
const WIDTH_GAP = 0.95;

export class HalfCourt extends BaseCourt {
  public width: number;
  public topLeftPaleX: number = 0;
  public lines: PositionLine[] = [];

  constructor(
    canvas: HTMLCanvasElement,
    context: IGame["context"],
    height: number,
    y: number,
    side: "left" | "right"
  ) {
    super(canvas, context, side, height, y);
    this.width = (canvas.width / 2) * WIDTH_GAP;
    this.height = height;
    this.topLeftPaleX = side === "left" ? 0 : canvas.width - this.width;
  }

  draw() {
    if (!this.context) return;

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

    this.drawPath();

    this.drawLines();
  }

  drawLines() {
    const isUpdate = !!this.lines.length;
    if (isUpdate) {
      this.updateLines();
    } else {
      this.createLines();
    }
  }

  private createLines() {
    const topWidth = (this.topRightX - this.topLeftX) / LINES_COUNT;
    const bottomWidth = (this.bottomRightX - this.bottomLeftX) / LINES_COUNT;

    for (let i = 0; i < LINES_COUNT; i++) {
      const positionIndex =
        this.side === "left"
          ? i
          : ((LINES_COUNT - 1 - i) as PositionLine["positionIndex"]);


      const line = new PositionLine(
        this.canvas,
        this.context,
        this.side,
        positionIndex,
        topWidth,
        bottomWidth,
        this.topLeftX,
        this.bottomLeftX,
        this.height,
        "space-between",
        this.y,
        this.side === "right" ? i === 0 : i === LINES_COUNT - 1
      );
      this.lines.push(line);
      line.draw(true);
    }
  }

  private updateLines() {
    const filteredLines = this.lines.filter((line) =>
      line.places.some((place) => place.character)
    );

    const correctedLines = this.lines
      .slice(0, filteredLines.length)
      .map((line, index, arr) => {
        line.places = filteredLines[index].places;
        line.isLastLine =
          this.side === "right" ? index === 0 : index === arr.length - 1;

        return line;
      });
    correctedLines.forEach((curLine, index) => {
      if (curLine) {
        const newGridType = this.checkLineGridType(index);

        if (curLine.getGridType() !== newGridType) {
          curLine.setGridType(newGridType);
        }
        curLine.draw();
      }
    });
    this.lines = correctedLines
  }
  private checkLineGridType(index: number): PositionLine["gridType"] {
    const curLine = this.lines[index];
    const otherLines = this.lines.filter((_, i) => i !== index);

    const hasTwoPlacesConflict =
      curLine.places.length === 2 &&
      otherLines.some(
        (line) =>
          line.places.length === 2 && line.getGridType() !== "space-between"
      );

    const hasSinglePlaceConflict =
      curLine.places.length === 1 &&
      (!otherLines.some(
        (line) =>
          line.places.length === 1 ||
          line.places.length % 2 ||
          line.places.length === 2
      ) ||
        this.lines.some(
          (line, i) => Math.abs(i - index) === 1 && line.places.length === 2
        ));

    if (
      (curLine.places.length > 1 && curLine.places.length % 2) ||
      hasTwoPlacesConflict ||
      hasSinglePlaceConflict
    ) {
      return "space-between";
    }

    return otherLines.some((line) => line.getGridType() === "space-around-top")
      ? "space-around-bottom"
      : "space-around-top";
  }

  public removeEmptyPlaces() {
    this.lines.forEach((line) => line.removeEmptyPlaces());
  }
  public hideLines() {
    this.lines.forEach((line) => line.hide());
  }
  public hidePlaces() {
    this.lines.forEach((line) => line.hidePlaces());
  }
}
