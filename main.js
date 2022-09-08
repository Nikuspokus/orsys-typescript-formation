console.log("start");

const samples = 10;

const svgns = "http://www.w3.org/2000/svg";

const container = document.querySelector("svg g.samples");

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
