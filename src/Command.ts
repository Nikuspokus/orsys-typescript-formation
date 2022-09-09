import { BoardConfig } from "./interfaces/BoardConfig";
import { querySelector, sleep } from "./utils";

type CommandCallback = (newConfig: BoardConfig) => void;

const DELAY = 18;
const STEP = 0.01;

export class Command {
  callback: CommandCallback | undefined;
  config: BoardConfig = {
    multiplicationFactor: 0,
    samples: 0,
  };
  isPlaying = false;

  constructor() {
    this.addListeners();
  }

  addListeners() {
    const boardConfigkeys: (keyof BoardConfig)[] = [
      "samples",
      "multiplicationFactor",
    ];
    for (const key of boardConfigkeys) {
      const input = querySelector(
        `div.command label.${key} input`,
        HTMLInputElement
      );
      input.addEventListener("input", (event) => {
        this.config[key] = +input.value;
        this.render();
        this.callback?.(this.config);
      });
    }

    const button = querySelector("div.command button");
    button.addEventListener("click", () => {
      console.log("coucou");
      this.isPlaying = !this.isPlaying;
      if (this.isPlaying) {
        this.startToPlay();
      }
      this.render();
    });
  }

  onUpdate(callback: CommandCallback) {
    this.callback = callback;
  }

  render() {
    const boardConfigkeys: (keyof BoardConfig)[] = [
      "samples",
      "multiplicationFactor",
    ];
    for (const key of boardConfigkeys) {
      const elt = querySelector(`div.command label.${key} span`);
      elt.innerHTML = this.config[key].toString();

      const sliderElt = querySelector(
        `div.command label.${key} input`,
        HTMLInputElement
      );
      sliderElt.value = this.config[key].toString();
    }

    querySelector("div.command button").innerHTML = this.isPlaying
      ? "Pause"
      : "Play";
  }

  setConfig(config: BoardConfig) {
    this.config = config;
    this.render();
    this.callback?.(this.config);
  }

  async startToPlay() {
    console.log("start to play");
    while (this.isPlaying) {
      await sleep(DELAY);
      this.config.multiplicationFactor += STEP;
      if (this.config.multiplicationFactor > 100) {
        this.config.multiplicationFactor = 0;
      }
      this.config.multiplicationFactor =
        Math.round(this.config.multiplicationFactor * 100) / 100;
      this.render();
      this.callback?.(this.config);
    }
  }
}
