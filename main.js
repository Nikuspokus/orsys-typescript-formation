console.log("start");

const samples = 10;

const svgns = "http://www.w3.org/2000/svg";

const container = document.querySelector("svg g.samples");
const lineContainer = document.querySelector("svg g.lines");

const x0 = 50;
const y0 = 50;
const r0 = 45;

const r = 1;

for (let i = 0; i < samples; i++) {
  console.log("i: ", i);

  const angle = i * ((2 * Math.PI) / samples) - Math.PI / 2;

  const x = x0 + r0 * Math.cos(angle);
  const y = y0 + r0 * Math.sin(angle);

  const circle = document.createElementNS(svgns, "circle");
  circle.setAttributeNS(null, "cx", x);
  circle.setAttributeNS(null, "cy", y);
  circle.setAttributeNS(null, "r", r);
  container.appendChild(circle);
}

const drawLine = (x1, y1, x2, y2) => {
  const line = document.createElementNS(svgns, "line");
  line.setAttributeNS(null, "x1", x1);
  line.setAttributeNS(null, "y1", y1);
  line.setAttributeNS(null, "x2", x2);
  line.setAttributeNS(null, "y2", y2);
  lineContainer.appendChild(line);
};
drawLine(34, 45, 56, 67);
