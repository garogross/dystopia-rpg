export const generateAreaSVGs = (
  areas: Record<
    string,
    {
      borderLines: { start: [number, number]; end: [number, number] }[];
      color: string;
    }
  >
) => {
  const svgPaths: { id: string; paths: string[]; color: string }[] = [];

  for (const [id, value] of Object.entries(areas)) {
    const { borderLines, color } = value;
    if (borderLines.length === 0) continue;

    const paths: string[] = [];
    const usedLines = new Set<number>();

    // Function to find connected lines and create paths
    const createPath = (startLineIndex: number): string => {
      const path: [number, number][] = [];
      const tolerance = 3; // or slightly larger if coords are off

      let first = borderLines[startLineIndex].start;
      let last = borderLines[startLineIndex].end;

      path.push(first, last);
      usedLines.add(startLineIndex);

      let found = true;
      let iterations = 0;
      let maxIterations = borderLines.length * 20;

      while (found && iterations < maxIterations) {
        found = false;
        iterations++;

        for (let i = 0; i < borderLines.length; i++) {
          if (usedLines.has(i)) continue;

          const line = borderLines[i];
          const { start, end } = line;

          // match at the END of current path with better precision
          if (
            start[0] <= last[0] + tolerance &&
            start[0] >= last[0] - tolerance &&
            start[1] <= last[1] + tolerance &&
            start[1] >= last[1] - tolerance
          ) {
            path.push(end);
            last = end;
            usedLines.add(i);
            found = true;
            break;
          }
          if (
            Math.abs(end[0] - last[0]) < tolerance &&
            Math.abs(end[1] - last[1]) < tolerance
          ) {
            path.push(start);
            last = start;
            usedLines.add(i);
            found = true;
            break;
          }

          // match at the START of current path
          if (
            Math.abs(end[0] - first[0]) < tolerance &&
            Math.abs(end[1] - first[1]) < tolerance
          ) {
            path.unshift(start);
            first = start;
            usedLines.add(i);
            found = true;
            break;
          }
          if (
            Math.abs(start[0] - first[0]) < tolerance &&
            Math.abs(start[1] - first[1]) < tolerance
          ) {
            path.unshift(end);
            first = end;
            usedLines.add(i);
            found = true;
            break;
          }
        }
      }

      // Convert to SVG path string with better precision
      if (path.length > 1) {
        return (
          `M ${path[0][0].toFixed(2)} ${path[0][1].toFixed(2)} ` +
          path
            .slice(1)
            .map((p) => `L ${p[0].toFixed(2)} ${p[1].toFixed(2)}`)
            .join(" ")
        );
      }
      return "";
    };

    // Create paths for all connected line groups
    while (usedLines.size < borderLines.length) {
      // Find the next unused line
      let nextLineIndex = -1;
      for (let i = 0; i < borderLines.length; i++) {
        if (!usedLines.has(i)) {
          nextLineIndex = i;
          break;
        }
      }

      if (nextLineIndex === -1) break;

      const pathString = createPath(nextLineIndex);
      if (pathString) {
        paths.push(pathString);
      }
    }

    if (paths.length > 0) {
      svgPaths.push({ id, paths, color: color });
    }
  }

  return svgPaths;
};
