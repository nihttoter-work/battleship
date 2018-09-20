import { Component, OnInit, ViewChild } from '@angular/core';
import { SquareComponent } from '../square/square.component';
import { Square } from '../../models/square';
import { merge, combineLatest } from 'rxjs';

@Component({
  selector: 'app-battleship',
  templateUrl: './battleship.component.html',
  styleUrls: ['./battleship.component.scss']
})
export class BattleshipComponent implements OnInit {
  @ViewChild('mySquare') mySquare: SquareComponent;
  @ViewChild('enemySquare') enemySquare: SquareComponent;

  gameIsOver = false;
  endGameText: string;

  constructor() { }

  ngOnInit() {
    this.startGame();
    this.enemySquare.shoots.subscribe((square: Square) => {
      this.mySquare.randomShoot();
    });
    combineLatest(this.mySquare.gameIsOver, this.enemySquare.gameIsOver).subscribe(
      ([lose, win]) => {
        if (lose || win) {
          if (win) {
            this.endGameText = `You won with score - ${this.enemySquare.score}`;
          }
          if (lose) {
            this.endGameText = `You lost`;
          }
          this.gameIsOver = true;
        } else {
          this.gameIsOver = false;
        }
      }
    );
  }

  startGame() {
    this.mySquare.startGame();
    this.enemySquare.startGame();
  }

}
