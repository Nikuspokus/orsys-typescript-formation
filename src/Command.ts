import { BoardConfig } from "./interfaces/BoardConfig";
import { querySelector } from "./utils";

type CommandCallBack = (newConfig: BoardConfig) => void;

export class Command {
  config: BoardConfig;
  callback: CommandCallBack;

  constructor() {
    this.addListeners();
  }

  addListeners() {
    const boardConfigKeys = ["samples", "multiplicationFactor"];
    for (const key of boardConfigKeys) {
      const input = querySelector(
        `div.command label.${key} input`,
        HTMLInputElement
      );
      input.addEventListener("input", (event) => {
        this.config[key] = input.value;
        this.render();
        this.callback(this.config);
      });
    }
  }

  onUpdate(callback: CommandCallBack) {
    this.callback = callback;
  }

  render() {
    const boardConfigKeys = ["samples", "multiplicationFactor"];
    for (const key of boardConfigKeys) {
      const elt = querySelector(`div.command label.${key} span`);
      elt.innerHTML = this.config[key].toString();

      const sliderElt = querySelector(`div.command label.${key} input`);
      if (!(sliderElt instanceof HTMLInputElement)) {
        throw new Error("SliderEltis not input elt");
      }
      sliderElt.value = this.config[key].toString();
    }
  }

  setConfig(config: BoardConfig) {
    this.config = config;
    this.render();
    this.callback?.(this.config);
  }
}
