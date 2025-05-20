import { IGame } from "./IGame";
import { HalfCourt } from "./HalfCourt";
import { PositionPlace } from "./PositionPlace";
import { Character } from "./Character";
import {
  axeHitAudio,
  explodeAudio,
  runAudio,
  shotAudio,
} from "../assets/audio";

const SHOTS_COUNT = 3;

const runAudioEl = new Audio();
runAudioEl.src = runAudio;
const explodeAudioEl = new Audio();
explodeAudioEl.src = explodeAudio;
const shotAudioEl = new Audio();
shotAudioEl.src = shotAudio;
const axeHitAudioEl = new Audio();
axeHitAudioEl.src = axeHitAudio;

export class Game implements IGame {
  public canvas: HTMLCanvasElement;
  public context: CanvasRenderingContext2D | null;
  public width: number;
  public height: number;
  public courts: [HalfCourt, HalfCourt] | null = null;
  public y: number;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height * 0.7;
    this.y = canvas.height - this.height;
  }

  drawCourts() {
    const context = this.context;
    if (!context) return;

    this.clearCanvas();
    const args = [this.canvas, this.context, this.height, this.y] as const;
    if (!this.courts?.length) {
      const leftCourt = new HalfCourt(...args, "left");
      const rightCourt = new HalfCourt(...args, "right");
      this.courts = [leftCourt, rightCourt];
    }
    this.courts.forEach((court) => court.draw());
  }

  private clearCanvas() {
    if (this.context) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  public updateCanvas() {
    
    if (!this.context) return;

    this.drawCourts();
  }

  public removeEmptyPlacesFromCourtsLines() {
    if (!this.courts || !this.context) return;
    this.courts.forEach((court) => court.removeEmptyPlaces());
    this.updateCanvas();
  }

  public hideLinesAndPlaces() {
    if (!this.courts || !this.context) return;
    this.courts.forEach((court) => {
      court.hideLines();
      court.hidePlaces();
    });

    this.updateCanvas();
  }

  // get character place by uuid ot owned
  public getCharacterPlace(uuid?: string) {
    if (!this.courts) return null;

    const findClb = (place: PositionPlace) =>
      uuid ? place.character?.uuid === uuid : place.character?.owned;
    const lines = this.courts.flatMap((court) => court.lines);
    const characterLine = lines.find((line) => line.places.find(findClb));

    if (!characterLine) return null;
    const place = characterLine.places.find(findClb);
    return { place, line: characterLine };
  }

  public async attack(rival: Character, attacker: Character) {
    const attackerId = attacker.uuid;

    if (attacker.type === "shooter") {
      if (attackerId) {
        for (let i = 0; i < SHOTS_COUNT; i++) {
          await this.shooting(attackerId);
        }
        for (let i = 0; i < SHOTS_COUNT; i++) {
          await this.explode(rival.uuid);
          if (i === Math.floor(SHOTS_COUNT / 2)) {
            this.hurting(rival.uuid);
          }
        }
      }
    } else {
      await this.moveTo("toRival", rival, attackerId);
      await this.slap(attackerId);
      await Promise.all([
        this.removeSlap(attackerId),
        this.hurting(rival.uuid),
      ]);
      await this.removeSlap(attackerId);
      await this.moveTo("toBack", undefined, attackerId);
    }
    this.hideLinesAndPlaces();
  }

  public async moveTo(
    type: "toRival",
    rival: Character,
    attackerId?: string
  ): Promise<void>;
  public async moveTo(
    type: "toBack",
    rival: undefined,
    attackerId?: string
  ): Promise<void>;
  public async moveTo(
    type: "toRival" | "toBack",
    rival?: Character,
    attackerId?: string
  ): Promise<void> {
    return new Promise<void>((resolve) => {
      runAudioEl.pause();
      runAudioEl.currentTime = 0;
      runAudioEl.play().catch(() => {});
      const animate = () => {
        const placeProps = this.getCharacterPlace(attackerId);
        if (
          !placeProps ||
          !placeProps.line ||
          !placeProps.place ||
          !placeProps.place.character ||
          (type === "toRival" && !rival)
        )
          return;
        const { line } = placeProps;
        const character = placeProps.place.character;

        const { width } = line.getLineWidthByPositionY(character.dY);

        const isInRight = character.inSide === "right";


        const rivalX = isInRight
          ? (rival?.x || 0) + (rival?.width || 0) * 2
          : rival?.x || 0;
        const rivalY = rival?.y || 0;
        const targetX = type === "toRival" ? rivalX - width : character.x;
        const targetY = type === "toRival" ? rivalY : character.y;

        const condition = !isInRight
          ? type === "toRival"
            ? character.dX >= targetX && character.dY >= targetY
            : character.dX <= targetX && targetY <= character.y
          : type === "toRival"
          ? character.dX <= targetX && character.dY <= targetY
          : character.dX >= targetX && targetY >= character.y;
        if (condition) {
          runAudioEl.pause();
          runAudioEl.currentTime = 0;

          resolve();
          return;
        } else {
          character.move(width, targetX, targetY);
          this.updateCanvas();
          requestAnimationFrame(animate);
        }
      };
      animate();
    });
  }

  public async slap(attackerId?: string): Promise<void> {
    return new Promise<void>((resolve) => {
      axeHitAudioEl.pause();
      axeHitAudioEl.currentTime = 0;
      axeHitAudioEl.play().catch(() => {});
      const animate = () => {
        const placeProps = this.getCharacterPlace(attackerId);
        if (
          !placeProps ||
          !placeProps.line ||
          !placeProps.place ||
          !placeProps.place.character
        )
          return;
        const character = placeProps.place.character;
        if (character.slappingProgress >= 1) {
          resolve();
          return;
        } else {
          character.updateSlapping();
          this.updateCanvas();
          requestAnimationFrame(animate);
        }
      };
      animate();
    });
  }

  public async removeSlap(attackerId?: string): Promise<void> {
    return new Promise<void>((resolve) => {
      const animate = () => {
        const placeProps = this.getCharacterPlace(attackerId);
        if (
          !placeProps ||
          !placeProps.line ||
          !placeProps.place ||
          !placeProps.place.character
        )
          return;
        const character = placeProps.place.character;
        if (character.removeSlappingProgress >= 1) {
          character.resetSlapping();
          runAudioEl.pause();
          runAudioEl.currentTime = 0;
          resolve();
          return;
        } else {
          character.removeSlapping();
          this.updateCanvas();
          requestAnimationFrame(animate);
        }
      };
      animate();
    });
  }

  public async hurting(rivalId: string): Promise<void> {
    return new Promise<void>((resolve) => {
      const animate = () => {
        const placeProps = this.getCharacterPlace(rivalId);
        if (
          !placeProps ||
          !placeProps.line ||
          !placeProps.place ||
          !placeProps.place.character
        )
          return;
        const character = placeProps.place.character;
        if (character.hurtingProgress >= 1) {
          character.resetHurting();
          resolve();
          return;
        } else {
          character.updateHurting();
          this.updateCanvas();
          requestAnimationFrame(animate);
        }
      };
      animate();
    });
  }

  public async shooting(characterId: string): Promise<void> {
    return new Promise<void>((resolve) => {
      shotAudioEl.pause();
      shotAudioEl.currentTime = 0;
      shotAudioEl.play().catch(() => {});
      const animate = () => {
        const placeProps = this.getCharacterPlace(characterId);
        if (
          !placeProps ||
          !placeProps.line ||
          !placeProps.place ||
          !placeProps.place.character
        )
          return;
        const character = placeProps.place.character;

        if (character.shootingProgress >= 1) {
          character.resetShoting();
          shotAudioEl.pause();
          shotAudioEl.currentTime = 0;
          resolve();
          return;
        } else {
          character.updateShoting();
          this.updateCanvas();
          requestAnimationFrame(animate);
        }
      };
      animate();
    });
  }

  public async explode(characterId: string): Promise<void> {
    return new Promise<void>((resolve) => {
      explodeAudioEl.pause();
      explodeAudioEl.currentTime = 0;
      explodeAudioEl.play().catch(() => {});
      const animate = () => {
        const placeProps = this.getCharacterPlace(characterId);
        if (
          !placeProps ||
          !placeProps.line ||
          !placeProps.place ||
          !placeProps.place.character
        )
          return;
        const character = placeProps.place.character;

        if (character.explodingProgress >= 1) {
          explodeAudioEl.pause();
          explodeAudioEl.currentTime = 0;
          character.resetExploding();
          resolve();
          return;
        } else {
          character.updateExploding();
          this.updateCanvas();
          requestAnimationFrame(animate);
        }
      };
      animate();
    });
  }
}
