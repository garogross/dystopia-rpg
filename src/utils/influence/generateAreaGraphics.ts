import { Container, Graphics } from "pixi.js";
import { generateAreaSVGs } from "./generateAreaSVGs";
import { HEX_DEFAULT_COLOR } from "../../constants/influence/hexDefauktColor";

export const generateAndAddAreaGraphics = (
  hexLayer: Container,
  areaSVGs: ReturnType<typeof generateAreaSVGs>,
  width: number,
  dashed?: boolean, // still unused (needs custom dash implementation)
  alignment?: number
) => {
  // Pixi alignment is 0..1 (0 = inside, 0.5 = centered, 1 = outside)
  const align = alignment;

  areaSVGs.forEach(({ paths, color }) => {
    paths.forEach((pathString) => {
      if (!pathString) return;

      const g = new Graphics();

      const colorNumber = parseInt(
        (color || HEX_DEFAULT_COLOR).replace(/^#/, ""),
        16
      );

      // Set stroke style BEFORE drawing
      g.lineStyle(width || 1, colorNumber, 1, align);

      // Split into command segments: "M...", "L...", "Z"
      const segments = pathString.match(/[MLZ][^MLZ]*/gi) || [];

      for (const seg of segments) {
        const cmd = seg[0].toUpperCase();
        const nums = seg.slice(1).trim().split(/[ ,]+/).map(Number);

        if (cmd === "M" && nums.length >= 2) {
          g.moveTo(nums[0], nums[1]);
        } else if (cmd === "L") {
          for (let i = 0; i + 1 < nums.length; i += 2) {
            g[dashed ? "dashLineTo" : "lineTo"](nums[i], nums[i + 1]);
          }
        } else if (cmd === "Z") {
          g.closePath(); // optional; closes the current subpath
        }
      }

      // No stroke() call needed in v7 — drawing happens with the current lineStyle.
      hexLayer.addChild(g);
    });
  });
};
