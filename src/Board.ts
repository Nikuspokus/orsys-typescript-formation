import { BoardConfig } from "./interfaces/BoardConfig";
import { Point } from "./interfaces/Point";
import {
  computeAngle,
  computePointCoordinates,
  querySelector,
  setNbrAttribute,
} from "./utils";

const svgns = "http://www.w3.org/2000/svg";

export class Board {
  config: BoardConfig = {
    samples: 1,
    multiplicationFactor: 1,
  };

  clean() {
    querySelector("svg g.samples").innerHTML = "";
    querySelector("svg g.lines").innerHTML = "";
  }

  draw() {
    const container = querySelector("svg g.samples");

    const lineContainer = querySelector("svg g.lines");

    const r = 1;

    for (let i = 0; i < this.config.samples; i++) {
      const angle = computeAngle(i, this.config.samples);

      const { x, y } = computePointCoordinates(angle);

      const sample = document.createElementNS(svgns, "circle");
      setNbrAttribute(sample, "cx", x);
      setNbrAttribute(sample, "cy", y);
      setNbrAttribute(sample, "r", r);
      container.appendChild(sample);
    }

    const drawLine = (p1: Point, p2: Point) => {
      const line = document.createElementNS(svgns, "line");
      setNbrAttribute(line, "x1", p1.x);
      setNbrAttribute(line, "y1", p1.y);
      setNbrAttribute(line, "x2", p2.x);
      setNbrAttribute(line, "y2", p2.y);
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

  redraw() {
    this.clean();
    this.draw();
  }

  setConfig(config: BoardConfig) {
    this.config = config;
  }
}
