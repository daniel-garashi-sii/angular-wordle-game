import {Component} from '@angular/core';
import {Board} from "./models/board";
import {GameService} from "./services/game.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Wordle';
  errorMsg: string | null = null;

  board!: Board;
  guess!: string;

  isWin!: boolean;
  isLose!: boolean;


  constructor(private gameService: GameService) {
    this.newGame();
  }

  public newGame(): void {
    this.board = this.gameService.createBoard();
    this.guess = "";
    this.isWin = false;
    this.isLose = false;
    console.log(this.board.randomWord);
  }

  public addGuess(guessInput: HTMLInputElement) {
    try {
      this.board.gussWord = guessInput.value.toLowerCase();
      this.gameService.addGuess(this.board);
      guessInput.value = "";

      if (this.gameService.hasWon(this.board)) {
        this.isWin = true;
      }

      if (this.gameService.isGameOver(this.board)) {
        this.isLose = true;
      }

    } catch (e) {
      this.errorMsg = "Invalid word";
      console.log("error msg");
      setTimeout(() => {
        this.errorMsg = null;
      }, 2000);
    }

  }

  public reset(guessInput: HTMLInputElement): void {
    this.newGame();
    guessInput.value = "";
  }
}

