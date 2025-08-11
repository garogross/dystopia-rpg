import * as PIXI from "pixi.js";

declare module "pixi.js" {
  interface Graphics {
    dashLineTo(toX: number, toY: number, dash?: number, gap?: number): this;
  }
}
