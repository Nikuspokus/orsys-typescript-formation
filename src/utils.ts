import { Point } from "./interfaces/Point";

const x0 = 50;
const y0 = 50;
const r0 = 45;

export const computeAngle = (
  i: number,
  samples: number,
  multiplicationFactor = 1
) => {
  return i * ((2 * Math.PI) / samples) * multiplicationFactor - Math.PI / 2;
};

export const computePointCoordinates = (angle: number): Point => {
  const x = x0 + r0 * Math.cos(angle);
  const y = y0 + r0 * Math.sin(angle);
  return { x, y };
};

export const querySelector = <T extends Element>(
  cssSelector: string,
  type?: new () => T
): T => {
  const elt = document.querySelector(cssSelector);
  if (elt === null) {
    throw new Error("Cannot find selector: " + cssSelector);
  }
  if (type !== undefined && !(elt instanceof type)) {
    throw new Error(
      `Cannot find selector of type ${type} on selector ${cssSelector}`
    );
  }
  return elt as T;
};

export const setNbrAttribute = (elt: Element, key: string, value: number) => {
  elt.setAttributeNS(null, key, value.toString());
};

type millisecond = number;

export const sleep = (delay: millisecond) => {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, delay);
  });
};
