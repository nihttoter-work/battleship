import { Injectable } from '@angular/core';
import { Square } from '../models/square';
import { Ship } from '../models/ship';
import { ShipForm } from '../models/ship-form';
import * as Random from './../utils/random';

@Injectable({
  providedIn: 'root'
})
export class ShipService {

  constructor() { }

  generateShips(square: Square[][], ship: Ship[]): Ship[] {
    return [];
  }

  generateShip(square: Square[][], form: ShipForm, length: number) {
    const cells: Square[] = [].concat(...square).filter(cell => !cell.isOccupied);

    let randomCell: Square = cells[Random.getRandomNumber(cells.length - 1)];
    let isVertical: boolean = Random.getRandomBoolean();

    if (form == 'I') {
      if (isVertical) {
        if (
          length == [].concat(...square)
            .filter((cell: Square) =>
              !cell.isOccupied && cell.y >= randomCell.y && cell.y < randomCell.y + length
            )
            .length) {
              this.setShip(square, randomCell, 'I', length);
        }
        ;
      }
    }
  }

  findNotOccupiedPossition(square: Square[][]) {

  }

  isPossibleToSetShip(square: Square[][], cell: Square, length: number, form: ShipForm) {
  }

  setShip(square: Square[][], startPossition: Square, form: ShipForm, length: number) {

  }
}
