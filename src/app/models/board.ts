import {Cell} from "./cell";

export interface Board {
  cells: Cell[][];
  filledRows: number;
  randomWord: string;
  gussWord: string;
}
