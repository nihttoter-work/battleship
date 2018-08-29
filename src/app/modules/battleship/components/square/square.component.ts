import { Component, OnInit } from '@angular/core';
import { SquareService } from '../../services/square.service';
import { ShipService } from '../../services/ship.service';
import { UserActionsService } from '../../services/user-actions.service';
import { Square } from '../../models/square';
import { Ship } from '../../models/ship';

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

  constructor(
    public squareService: SquareService,
    public shipService: ShipService,
    public userActions: UserActionsService,
  ) { }

  ngOnInit() {
    this.square = this.squareService.generateSquare(10, 10);
    this.square = this.shipService.generateShip(this.square, {
      id: 1,
      length: 4,
      shipForm: 'I',
      shipState: 'unharmed',
      squares: []
    });
    //this.square = this.shipService.generateShips(this.square, []);
    this.rows = this.getRows(this.square);
    this.cells = this.getCells(this.square);
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

}
