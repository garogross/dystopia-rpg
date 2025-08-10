import { Container, ContainerChild, Graphics } from "pixi.js";
import { generateAreaSVGs } from "./generateAreaSVGs";

export const generateAndAddAreaGraphics = (
  hexLayer: Container<ContainerChild>,
  areaSVGs: ReturnType<typeof generateAreaSVGs>,
  width: number
) => {
  areaSVGs.forEach(({ paths, color }) => {
    paths.forEach((pathString) => {
      if (pathString) {
        const graphics = new Graphics();

        // Convert hex color to number for PIXI.js
        let colorStr = color;
        if (colorStr.startsWith("#")) colorStr = colorStr.slice(1);
        const colorNumber = parseInt(colorStr, 16);

        // Parse the SVG path and draw it using PIXI Graphics
        const pathCommands = pathString.split(/(?=[ML])/);
        let firstPoint = true;

        pathCommands.forEach((command) => {
          const type = command[0];
          const coords = command.slice(1).trim().split(" ").map(Number);

          if (type === "M" && coords.length >= 2) {
            if (firstPoint) {
              graphics.moveTo(coords[0], coords[1]);
              firstPoint = false;
            } else {
              graphics.lineTo(coords[0], coords[1]);
            }
          } else if (type === "L" && coords.length >= 2) {
            graphics.lineTo(coords[0], coords[1]);
          }
        });

        // Apply stroke with better quality settings - increased width and better color handling
        graphics.stroke({
          width: width || 1,
          color: colorNumber,
          alpha: 1,
          cap: "round", // Round line caps for smoother appearance
          join: "round", // Round line joins for smoother corners
        });

        hexLayer.addChild(graphics);
      }
    });
  });
};
