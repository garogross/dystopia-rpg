import { v4 } from "uuid";
import { explodeImage, shotImage, slapImage } from "../assets/images";
import { BaseCourt } from "./BaseCourt";
import { ICharacterModel } from "../models/ICharacterModel";
const MOVE_SPEED = 6;
const SLAPPING_SPEED = 0.1;
const HURTING_SPEED = 0.05;
const EXPLODING_SPEED = 0.1;
const DEATH_SPEED = 0.1;

const SHOTING_SPEED = 0.1;
const SHOTING_SLIDE_LEFT_DISTANCE = 0.1;
const SHOTING_LEFT_DISTANCE = 0.2;

const slapImgEl = new Image();
slapImgEl.src = slapImage;

const shotImgEl = new Image();
shotImgEl.src = shotImage;
const explodeImgEl = new Image();
explodeImgEl.src = explodeImage;

export class Character {
  uuid: string;
  width: number;
  height: number;
  x: number;
  y: number;
  dX: number;
  dY: number;
  image: string;
  imgElement: HTMLImageElement;
  owned: boolean;
  type: ICharacterModel["type"];
  inSide: BaseCourt["side"];

  slapping: boolean = false;
  slappingProgress: number = 0;
  removeSlappingProgress: number = 0;

  hurtingValue: null | number = null;
  hurtingProgress: number = 0;

  shooting: boolean = false;
  shootingProgress: number = 0;

  exploding: boolean = false;
  explodingProgress: number = 0;

  death: boolean = false;
  deathProgress: number = 0;

  constructor(
    x: number,
    y: number,
    size: number,
    image: string,
    type: Character["type"],
    inSide: Character["inSide"],
    owned?: boolean,
    uuid?: string,
    death?: boolean
  ) {
    this.uuid = uuid || v4();
    this.x = x;
    this.y = y - size;
    this.dX = this.x;
    this.dY = this.y;
    this.width = size;
    this.height = size;
    this.owned = !!owned;
    this.image = image;
    this.type = type;
    this.inSide = inSide;

    const img = new Image();
    img.src = this.image;
    this.imgElement = img;

    if (death) {
      this.death = true;
      this.deathProgress = 1;
    }
  }

  draw(context: CanvasRenderingContext2D) {
    context.save();
    context.imageSmoothingEnabled = true;

    if (this.death) {
      // Rotate from 0deg to 90deg (in radians: 0 to Math.PI/2) based on deathProgress
      const angle = (Math.PI / 2) * this.deathProgress;
      // Transform origin: bottom center
      const cx = this.dX + this.width / 2;
      const cy = this.dY + this.height;

      context.translate(cx, cy);
      // Rotate left (counter-clockwise) if inSide is "left", right (clockwise) if "right"

      context.rotate(this.inSide === "left" ? -angle : angle);
      context.translate(-this.width / 2, -this.height);

      context.drawImage(this.imgElement, 0, 0, this.width, this.height);
    } else {
      context.drawImage(
        this.imgElement,
        this.dX,
        this.dY,
        this.width,
        this.height
      );
    }

    context.restore();

    if (this.slapping) {
      this.drawSlap(context);
    }
    if (this.hurtingValue) this.drawHurt(context);
    if (this.shooting) this.drawShot(context);
    if (this.exploding) this.drawExplode(context);
  }

  drawSlap(context: CanvasRenderingContext2D) {
    const destHeight = this.height * this.slappingProgress;
    const removeHeight = this.height * this.removeSlappingProgress;
    const slapWidth = this.width / 2;
    const isRight = this.inSide === "right";
    const dx = isRight ? this.dX - slapWidth * 0.5 : this.dX + this.width;

    context.save();
    if (isRight) {
      // Flip horizontally around the vertical axis at the left edge of the slap
      context.translate(dx + slapWidth / 2, this.dY + this.height / 2);
      context.rotate(Math.PI); // 180deg
      context.translate(-slapWidth / 2, -this.height / 2);
    }

    context.drawImage(
      slapImgEl,
      0,
      removeHeight,
      slapImgEl.width,
      destHeight,
      isRight ? 0 : dx,
      isRight ? 0 : this.dY + removeHeight,
      slapWidth,
      destHeight
    );

    context.restore();
  }

  drawHurt(context: CanvasRenderingContext2D) {
    const textSlide = this.height / 4; // px to slide up
    const textY = this.dY - textSlide * this.hurtingProgress;
    const textOpacity = this.hurtingProgress;

    context.save();
    context.globalAlpha = textOpacity;
    context.font = `Bold ${this.width * 0.3}px DS_Army`;
    context.fillStyle = "#650000";
    context.textAlign = "center";
    context.fillText(`-${this.hurtingValue}`, this.dX + this.width / 2, textY);
    context.restore();
  }

  drawShot(context: CanvasRenderingContext2D) {
    if (!this.shooting) return;
    const slideDistance =
      this.width * SHOTING_SLIDE_LEFT_DISTANCE * this.shootingProgress;
    const opacity = 1 - this.shootingProgress; // Fade out as progress increases
    const isRight = this.inSide === "right";
    const shotWidth = this.width * 0.5;
    const shotHeight = this.height * 0.5;

    // Draw on left side if "right", right side if "left"
    const x = isRight
      ? this.dX - shotWidth * SHOTING_LEFT_DISTANCE - slideDistance
      : this.dX +
        shotWidth +
        this.width * SHOTING_LEFT_DISTANCE +
        slideDistance;

    context.save();
    context.globalAlpha = opacity;

    if (!isRight) {
      // Rotate 180deg around the center of the shot
      context.translate(x + shotWidth / 2, this.dY + shotHeight / 2);
      context.rotate(Math.PI);
      context.drawImage(
        shotImgEl,
        -shotWidth / 2,
        -shotHeight / 2,
        shotWidth,
        shotHeight
      );
    } else {
      context.drawImage(shotImgEl, x, this.dY, shotWidth, shotHeight);
    }

    context.restore();
  }
  drawExplode(context: CanvasRenderingContext2D) {
    if (!this.exploding) return;
    const slideDistance = this.width * this.explodingProgress; // Slide to left
    const opacity = 1; // - this.explodingProgress; // Fade out as progress increases

    const dX =
      this.inSide === "left"
        ? this.dX + this.width - slideDistance
        : this.dX - this.width + slideDistance;
    context.save();
    context.globalAlpha = opacity;
    context.drawImage(explodeImgEl, dX, this.dY, this.height, this.width);
    context.restore();
  }

  update(x: number, y: number, size: number, image: string, death?: boolean) {
    const yPos = y - size;
    const isPositionUpdated = x !== this.x || yPos !== this.y;
    this.x = x;
    this.y = y - size;
    if (isPositionUpdated) {
      this.dX = this.x;
      this.dY = this.y;
      this.width = size;
      this.height = size;
    }
    this.image = image;

    if (death) {
      this.death = true;
      this.deathProgress = 1;
    }
  }

  move(size: number, targetX: number, targetY: number) {
    this.width = size;
    this.height = size;

    // Calculate direction to target
    const dx = targetX - this.dX;
    const dy = targetY - this.dY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // If not there yet, move toward target
    // const condition = this.inSide === "left" ? distance > MOVE_SPEED : distance < MOVE_SPEED
    if (this.dX !== targetX || this.dY !== targetY) {
      this.dX += (dx / distance) * MOVE_SPEED;
      this.dY += (dy / distance) * MOVE_SPEED;
    } else {
      this.dX = targetX;
      this.dY = targetY;
    }
  }
  updateSlapping() {
    this.slapping = true;
    if (this.slappingProgress < 1) {
      this.slappingProgress += SLAPPING_SPEED;
    }
  }
  removeSlapping() {
    this.slapping = true;
    if (this.removeSlappingProgress < 1) {
      this.removeSlappingProgress += SLAPPING_SPEED;
    }
  }

  resetSlapping() {
    this.slapping = false;
    this.slappingProgress = 0;
    this.removeSlappingProgress = 0;
  }

  updateHurting(value: number) {
    this.hurtingValue = value;
    if (this.hurtingProgress < 1) {
      this.hurtingProgress += HURTING_SPEED;
    }
  }

  resetHurting() {
    this.hurtingValue = null;
    this.hurtingProgress = 0;
  }

  updateShoting() {
    this.shooting = true;
    if (this.shootingProgress < 1) {
      this.shootingProgress = +(this.shootingProgress + SHOTING_SPEED).toFixed(
        1
      );
    } else {
      this.shootingProgress = 1;
    }
  }

  resetShoting() {
    this.shooting = false;
    this.shootingProgress = 0;
  }
  updateExploding() {
    this.exploding = true;
    if (this.explodingProgress < 1) {
      this.explodingProgress = +(
        this.explodingProgress + EXPLODING_SPEED
      ).toFixed(1);
    } else {
      this.explodingProgress = 1;
    }
  }

  resetExploding() {
    this.exploding = false;
    this.explodingProgress = 0;
  }
  updateDeathProcess() {
    this.death = true;
    if (this.deathProgress < 1) {
      this.deathProgress = +(this.deathProgress + DEATH_SPEED).toFixed(1);
    } else {
      this.deathProgress = 1;
    }
  }

  resetDeathProcess() {
    this.deathProgress = 0;
  }

  resetAllStatuses() {
    this.resetSlapping();
    this.resetHurting();
    this.resetShoting();
    this.resetExploding();
    this.resetDeathProcess();
  }
}
