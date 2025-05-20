import { BaseCourt } from "./BaseCourt";
import { Character } from "./Character";
import { IGame } from "./IGame";
import { PositionPlace } from "./PositionPlace";

const POSITION_LINE_COLORS = ["#EA030859", "#EAB40359", "#03EA0359"] as const;
const MAX_PLACE_PER_LINE = 3;
export class PositionLine extends BaseCourt {
  private positionIndex: number; //  0 | 1 | 2;
  private gridType:
    | "space-around-top"
    | "space-around-bottom"
    | "space-between";
  private transparent: boolean = false;
  public places: PositionPlace[] = [];
  public isLastLine: boolean;

  constructor(
    canvas: HTMLCanvasElement,
    context: IGame["context"],
    side: "left" | "right",
    positionIndex: PositionLine["positionIndex"], // 0 | 1 | 2,
    topWidth: number,
    bottomWidth: number,
    parentTopLeftX: number,
    parentBottomLeftX: number,
    height: number,
    gridType: PositionLine["gridType"],
    y: number,
    isLastLine?: boolean
  ) {
    super(canvas, context, side, height, y);
    this.positionIndex = positionIndex;
    this.gridType = gridType;
    this.isLastLine = !!isLastLine;

    this.topLeftX = parentTopLeftX + topWidth * positionIndex;
    this.topRightX = parentTopLeftX + topWidth * (positionIndex + 1);
    this.bottomLeftX = parentBottomLeftX + bottomWidth * positionIndex;
    this.bottomRightX = parentBottomLeftX + bottomWidth * (positionIndex + 1);
  }

  public setGridType(gridType: PositionLine["gridType"]) {
    this.gridType = gridType;
  }

  public getGridType() {
    return this.gridType;
  }

  override draw(isInit?: boolean) {
    const ctx = this.context;
    if (!ctx) return;

    if (!this.transparent) {
      const colors = POSITION_LINE_COLORS;
      let colorIndex = 1;
      if (this.isLastLine) colorIndex = colors.length - 1;
      if (!this.positionIndex) colorIndex = 0;
      ctx.fillStyle = colors[colorIndex];
    } else {
      ctx.fillStyle = "transparent";
    }
    this.drawPath();
    ctx.fill();

    this.drawPlaces(isInit);
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

  drawPlaces(isInit?: boolean) {
    type DrawPlaceParams = Parameters<typeof this.drawPlace>;
    const characters = this.places.map((item) => item.character);
    const charactersCount = !isInit ? characters?.length : MAX_PLACE_PER_LINE;

    for (let i: number = 0; i < charactersCount; i++) {
      const characterImage = characters?.[i]?.image;
      const characterType = characters?.[i]?.type;
      const drawPlace = (
        position: DrawPlaceParams[0],
        y?: DrawPlaceParams[1]
      ) => {
        this.drawPlace(
          position,
          y,
          this.places[i],
          characterImage,
          characterType
        );
      };
      if (this.gridType === "space-between") {
        if (charactersCount === 1) {
          const y = this.get3DEffectY(i, charactersCount, this.height);

          drawPlace("center", y);
        } else {
          if (!i) {
            drawPlace("top", undefined);
          } else if (i === charactersCount - 1) {
            drawPlace("bottom");
          } else {
            const y = this.get3DEffectY(i, charactersCount, this.height);

            drawPlace("center", y);
          }
        }
      }
      if (this.gridType.startsWith("space-around")) {
        const isBottomGridType = this.gridType.endsWith("bottom");
        const y = this.getSpaceAround3DEffectY(
          i,
          charactersCount,
          this.height,
          isBottomGridType
        );

        drawPlace("center", y);
      }
    }
  }

  private drawPlace(
    position: "top" | "bottom" | "center",
    y: number = 0,
    curPlace?: PositionPlace,
    image?: Character["image"],
    type?: Character["type"]
  ) {
    const ctx = this.context;
    switch (position) {
      case "top": {
        y = y || 0;
        break;
      }
      case "bottom": {
        y = y || y + this.height;
        break;
      }
      case "center": {
        y = y || y + this.height * 0.5;
        break;
      }
    }

    const { width: topWidth, leftX: topLeftX } =
      this.getLineWidthByPositionY(y);
    const placeHeight = topWidth * 0.3; // keep it a circle
    let yPosition = 0;
    let yBottomPosition = 0;

    switch (position) {
      case "top": {
        y = 0;
        yBottomPosition = y + placeHeight;
        yPosition = 0;
        break;
      }
      case "bottom": {
        y = this.height;

        yBottomPosition = y - placeHeight;
        yPosition = yBottomPosition;

        break;
      }
      case "center": {
        yPosition = y - placeHeight / 2;
        break;
      }
    }

    const { width: bottomWidth, leftX: bottomLeftX } =
      this.getLineWidthByPositionY(yBottomPosition);
    const width =
      position === "center" ? topWidth : (topWidth + bottomWidth) / 2;
    const leftX =
      position === "center" ? topLeftX : (topLeftX + bottomLeftX) / 2;

    if (curPlace) {
      curPlace.update(
        width,
        placeHeight,
        leftX,
        this.y + yPosition,
        type,
        image
      );

      curPlace.draw(ctx);
    } else {
      const newPlace = new PositionPlace(
        this.context,
        width,
        placeHeight,
        leftX,
        this.y + yPosition,
        this.side,
        image
      );

      this.places.push(newPlace);

      newPlace.draw(ctx);
    }
  }

  public getLineWidthByPositionY(y: number) {
    const leftX = this.interpolateX(this.topLeftX, this.bottomLeftX, y);
    const rightX = this.interpolateX(this.topRightX, this.bottomRightX, y);
    return { width: rightX - leftX, leftX, rightX };
  }

  public addCharactersToPlaces(
    characters: {
      uuid: string;
      index: number;
      image: string;
      type: Character["type"];
      owned?: boolean;
    }[]
  ) {
    characters.forEach((character) => {
      const curPlace = this.places[character.index];

      if (curPlace && character.image) {
        curPlace.setCharacter(character.image, character.type, character.owned,character.uuid);
      }
    });
  }

  public removeEmptyPlaces() {
    this.places = this.places.filter((place) => place.character);
  }

  public hide() {
    this.transparent = true;
  }
  public hidePlaces() {
    this.places.forEach((place) => place.hidePlace());
  }
}
