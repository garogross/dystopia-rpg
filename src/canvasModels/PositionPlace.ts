import { positionPlaceImage } from "../assets/images";
import { IGame } from "./IGame";

export class PostitionPlace {
  width: number;
  height: number;
  x: number;
  y: number;

  constructor(width: number, height: number, x: number, y: number) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }

  draw(ctx: IGame["context"]) {
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;

    const image = new Image();
    image.src = positionPlaceImage;
    ctx.imageSmoothingEnabled = false;
  
  // rect example
    // ctx.fillStyle = "rgba(0, 0, 0, 0.5)"; // Example color
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    // ctx.strokeStyle = "rgba(255, 255, 255, 0.8)"; // Example stroke color
    // ctx.lineWidth = 2; // Example stroke width
    // ctx.strokeRect(this.x, this.y, this.width, this.height);

    const drawImage = () =>
      ctx.drawImage(image, this.x, this.y, this.width, this.height);

    image
      .decode()
      .then(() => {
        drawImage();
      })
      .catch((err) => {
        console.warn("Decode failed, fallback to onload", err);
        image.onload = () => {
          drawImage();
        };
      });
  }
}
