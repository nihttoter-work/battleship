import { Component, OnInit } from '@angular/core';
import { SquareService } from '../../services/square.service';
import { ShipService } from '../../services/ship.service';
import { UserActionsService } from '../../services/user-actions.service';
import { Square } from '../../models/square';
import { Ship } from '../../models/ship';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit {
  square: Square[];
  ships: Ship[];
  rows: number[];
  cells: number[];
  score = 0;
  gameIsOver = false;

  constructor(
    public squareService: SquareService,
    public shipService: ShipService,
    public userActions: UserActionsService,
  ) { }

  ngOnInit() {
    this.startGame();
  }

  startGame() {
    this.score = 0;
    this.square = this.squareService.generateSquare(environment.squareWidth, environment.squareHeight);
    this.ships = this.getShipsFromEnv();
    this.square = this.shipService.generateShips(this.square, this.ships);

    this.rows = this.getRows(this.square);
    this.cells = this.getCells(this.square);

    this.gameIsOver = false;
  }

  getShipsFromEnv(): Ship[] {
    const ships = [];
    let id = 1;
    environment.ships.forEach(ship => {
      ships.push(new Ship(
        id,
        ship.length,
        ship.shipForm
      ));
      id++;
    });

    return ships;
  }

  getRows(square: Square[]): number[] {
    if (!square) {
      return [];
    }
    return Array.from(new Set(square.map(cell => cell.y)));
  }

  getCells(square: Square[]): number[] {
    if (!square) {
      return [];
    }
    return Array.from(new Set(square.map(cell => cell.x)));
  }

  getCell(x: number, y: number): Square {
    return this.square.find(cell => cell.x === x && cell.y === y);
  }

  shoot(cell: Square) {
    this.userActions.shoot(this.square, this.ships, cell);
    this.score++;
    this.gameIsOver = this.ships.every(ship => ship.shipState === 'killed')
  }

}
