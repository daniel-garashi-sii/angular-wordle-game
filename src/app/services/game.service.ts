import {Injectable} from '@angular/core';
import {Board} from "../models/board";
import {Cell} from "../models/cell";
import {WORDS} from "../models/all-words";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() {
  }

  public createBoard(): Board {
    let board: Board = {
      cells: this.createAndInitGameBoard(),
      filledRows: 0,
      gussWord: "",
      randomWord: this.drawWord()
    };

    return board;
  }

  public createAndInitGameBoard(): Cell[][] {
    let cells: Cell[][] = [];
    for (let r = 0; r < 6; r++) {
      let row: Cell[] = [];
      for (let c = 0; c < 5; c++)
        row.push({content: "", status: "empty"});

      cells.push(row);
    }

    return cells;
  }

  public reset(board: Board): void {
    board.cells.forEach((row: Cell[]) => {
      row.forEach((cell: Cell) => {
        cell.content = "";
        cell.status = "empty";
      });
    });

    board.filledRows = 0;
    board.gussWord = "";
    board.randomWord = this.drawWord();
  }

  public drawWord(): string {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
  }

  public addGuess(board: Board): void {
    if (!this.isValidWord(board.gussWord))
      throw "Invalid word";

    for (let letIndex = 0; letIndex < 5; letIndex++) {
      let letter: string = board.gussWord.charAt(letIndex);
      board.cells[board.filledRows][letIndex].content = letter;
      this.setCellStatus(board.randomWord, letter, letIndex);
    }

    board.filledRows++;
  }

  public isGameOver(board: Board): boolean {
    if (this.hasWon(board))
      return true;

    if (board.filledRows === 6)
      return true;

    board.gussWord = "";
    return false;
  }

  public hasWon(board: Board): boolean {
    return board.gussWord === board.randomWord;
  }

  public isValidWord(word: string): boolean {
    return WORDS.includes(word);
  }

  public setCellStatus(drawWord: string, letter: string, letIndex: number): "empty" | "wrong" | "exists" | "exact" {
    if (drawWord.charAt(letIndex) === letter)
      return "exact";

    if (drawWord.includes(letter))
      return "exists";

    return "wrong";
  }
}

