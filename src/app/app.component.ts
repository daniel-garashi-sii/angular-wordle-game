import { Component } from '@angular/core';
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

  board: Board;
  guess: string;

  constructor(private gameService: GameService) {
    this.board = gameService.createBoard();
    this.guess = "";
  }

  public addGuess(guess: string) {
    try {
      this.board.gussWord = guess.toLowerCase()
      this.gameService.addGuess(this.board);

      if (this.gameService.hasWon(this.board)) {

      }

      if (this.gameService.isGameOver(this.board)) {

      }
    }catch (e){
      this.errorMsg = "Invalid word";
      setTimeout(() => {
        this.errorMsg = null;
      }, 2000);
    }

  }
}

