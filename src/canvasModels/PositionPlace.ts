import { positionPlaceImage } from "../assets/imageMaps";
import { BaseCourt } from "./BaseCourt";
import { Character } from "./Character";
import { IGame } from "./IGame";

const image = new Image();
image.src = positionPlaceImage;

export class PositionPlace {
  private context: IGame["context"];
  private width: number;
  private height: number;
  private x: number;
  private y: number;
  private transparent: boolean = false;
  inSide: BaseCourt["side"];
  public character: Character | null = null;

  constructor(
    context: IGame["context"],
    width: number,
    height: number,
    x: number,
    y: number,
    inSide: PositionPlace["inSide"],
    characterImage?: Character["image"],
    characterType?: Character["type"]
  ) {
    this.context = context;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.inSide = inSide;

    if (characterImage && characterType) {
      this.setCharacter(characterImage, characterType);
    }
  }

  public draw(ctx: IGame["context"]) {
    if (!ctx || this.transparent) return;
    ctx.imageSmoothingEnabled = false;

    ctx.imageSmoothingEnabled = false;

    ctx.drawImage(image, this.x, this.y, this.width, this.height);
  }

  public update(
    width: number,
    height: number,
    x: number,
    y: number,
    characterType?: Character["type"],
    characterImage?: Character["image"]
  ) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;

    if (characterImage && characterType) {
      this.setCharacter(characterImage, characterType);
    } else if (this.character) {
      this.removeCharacter();
    }
  }

  public setCharacter(
    characterImage: Character["image"],
    type: Character["type"],
    owned?: boolean,
    uuid?: string,
    death?: boolean
  ) {
    const ctx = this.context;
    if (!ctx) return;
    const y = this.y + this.height / 2;

    if (this.character) {
      this.character.update(this.x, y, this.width, characterImage, death);
    } else {
      this.character = new Character(
        this.x,
        y,
        this.width,
        characterImage,
        type,
        this.inSide,
        owned,
        uuid,
        death
      );
    }
    this.character.draw(ctx);

    return this.character;
  }
  private removeCharacter() {
    this.character = null;
  }

  public removePlace(ctx: IGame["context"]) {
    if (!ctx) return;
    ctx.clearRect(this.x, this.y, this.width, this.height);
  }
  public hidePlace() {
    this.transparent = true;
  }

  public showPlace() {
    this.transparent = false;
  }

  public checkTarget(x: number, y: number) {
    const curCharacter = this.character;

    if (!curCharacter) return null;

    return (
      x >= curCharacter.x &&
      x <= curCharacter.x + curCharacter.width &&
      y >= curCharacter.y &&
      y <= curCharacter.y + curCharacter.height
    );
  }
}
