import { BoardConfig } from "./interfaces/BoardConfig";
import { querySelector, computeAngle, computePointCoordinates } from "./utils";

const svgns = "http://www.w3.org/2000/svg";

export class Board {
  config: BoardConfig;
  draw() {
    const container = querySelector("svg g.samples");

    const lineContainer = querySelector("svg g.lines");

    const r = 1;

    for (let i = 0; i < this.config.samples; i++) {
      console.log("i: ", i);

      const angle = computeAngle(i, this.config.samples);

      const { x, y } = computePointCoordinates(angle);

      const circle = document.createElementNS(svgns, "circle");
      circle.setAttributeNS(null, "cx", `${x}`);
      circle.setAttributeNS(null, "cy", y.toString());
      circle.setAttributeNS(null, "r", r + "");
      container.appendChild(circle);
    }

    const drawLine = (p1, p2) => {
      const line = document.createElementNS(svgns, "line");
      line.setAttributeNS(null, "x1", p1.x);
      line.setAttributeNS(null, "y1", p1.y);
      line.setAttributeNS(null, "x2", p2.x);
      line.setAttributeNS(null, "y2", p2.y);
      lineContainer.appendChild(line);
    };

    for (let i = 0; i < this.config.samples; i++) {
      //draw a line
      const angle1 = computeAngle(i, this.config.samples);
      // compute point1 coordinate
      const p1 = computePointCoordinates(angle1);

      // compute angle2
      const angle2 = computeAngle(
        i,
        this.config.samples,
        this.config.multiplicationFactor
      );
      // compute point2 coordinate
      const p2 = computePointCoordinates(angle2);

      drawLine(p1, p2);
    }
  }

  setConfig(config: BoardConfig) {
    this.config = config;
  }
}
