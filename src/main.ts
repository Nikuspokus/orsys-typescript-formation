import { Board } from "./Board";
import { Command } from "./Command";
import { BoardConfig } from "./interfaces/BoardConfig";
import "./style.scss";

const board = new Board();

const config: BoardConfig = {
  samples: 100,
  multiplicationFactor: 3,
};

board.setConfig(config);
board.draw();

const command = new Command();
command.setConfig(config);
command.onUpdate((newConfig) => {
  board.setConfig(newConfig);
  board.redraw();
});
