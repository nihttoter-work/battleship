import { Component, OnInit, Input } from '@angular/core';
import { SquareService } from '../../services/square.service';
import { ShipService } from '../../services/ship.service';
import { UserActionsService } from '../../services/user-actions.service';
import { Square } from '../../models/square';
import { Ship } from '../../models/ship';
import { environment } from '../../../../../environments/environment';
import { Subject } from 'rxjs';
import { getRandomElementOfArray } from '../../utils/random';
import { AiService } from '../../services/ai.service';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit {
  @Input() clickable: boolean;
  @Input() visible: boolean;
  square: Square[];
  ships: Ship[];
  rows: number[];
  cells: number[];
  shoots: Subject<Square> = new Subject<Square>();
  gameIsOver: Subject<boolean> = new Subject<boolean>();
  score = 0;

  constructor(
    public squareService: SquareService,
    public shipService: ShipService,
    public userActions: UserActionsService,
    public aiService: AiService,
  ) { }

  ngOnInit() {
  }

  startGame() {
    this.score = 0;
    this.gameIsOver.next(false);
    this.square = this.squareService.generateSquare(environment.squareWidth, environment.squareHeight);
    this.ships = this.getShipsFromEnv();
    this.square = this.shipService.generateShips(this.square, this.ships);

    this.rows = this.getRows(this.square);
    this.cells = this.getCells(this.square);
  }

  getShipsFromEnv(): Ship[] {
    let id = 0;

    return environment.ships.map(ship => {
      id++;
      return new Ship(
        id,
        ship.length,
        ship.shipForm
      );
    });
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
    this.shoots.next(cell);
    this.gameIsOver.next(this.ships.every(ship => ship.shipState === 'killed'));
  }

  randomShoot() {
    const cell = this.aiService.getCellForShoot(this.square);
    this.shoot(cell);
  }

  cellShoot(cell: Square) {
    if (!this.clickable || cell.isShooted) {
      return;
    }
    this.shoot(cell);
  }
}
