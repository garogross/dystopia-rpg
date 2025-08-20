// 2. Add the method to the prototype

import * as PIXI from "pixi.js";
import { Point } from "pixi.js";

const origMoveTo = PIXI.Graphics.prototype.moveTo;

PIXI.Graphics.prototype.moveTo = function (x: number, y: number) {
  (this as any)._lastPos = new Point(x, y);
  return origMoveTo.call(this, x, y);
};

const origLineTo = PIXI.Graphics.prototype.lineTo;
PIXI.Graphics.prototype.lineTo = function (x: number, y: number) {
  (this as any)._lastPos = new Point(x, y);
  return origLineTo.call(this, x, y);
};

PIXI.Graphics.prototype.dashLineTo = function (
  toX: number,
  toY: number,
  dash = 5,
  gap = 5
) {
  const from = (this as any)._lastPos || new Point(0, 0);
  const to = new Point(toX, toY);
  const distance = Math.hypot(to.x - from.x, to.y - from.y);
  const v = new Point();
  for (let i = dash + gap; i <= distance; i += dash + gap) {
    const t1 = (i - gap) / distance;
    v.x = from.x + (to.x - from.x) * t1;
    v.y = from.y + (to.y - from.y) * t1;
    this.lineTo(v.x, v.y);
    const t2 = i / distance;
    v.x = from.x + (to.x - from.x) * t2;
    v.y = from.y + (to.y - from.y) * t2;
    this.moveTo(v.x, v.y);
  }
  this.lineTo(to.x, to.y);
  return this;
};
