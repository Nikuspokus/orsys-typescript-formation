import { BoardConfig } from "./interfaces/BoardConfig";
import { querySelector } from "./utils";

export class Command {
  config: BoardConfig;
  onUpdate(arg0: () => void) {
    throw new Error("Method not implemented.");
  }
  render() {
    const boardConfigKeys = ["samples", "multiplicationFactor"];
    for (const key of boardConfigKeys) {
      const elt = querySelector(`div.command label.${key} span`);
      console.log("elt: ", elt);
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
  }
}
