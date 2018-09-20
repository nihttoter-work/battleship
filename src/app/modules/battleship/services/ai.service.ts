import { Injectable } from '@angular/core';
import { Square } from '../models/square';
import { GetStrictNearest } from '../utils/cells';
import { getRandomElementOfArray } from '../utils/random';

@Injectable({
  providedIn: 'root'
})
export class AiService {

  constructor() { }

  getCellForShoot(square: Square[]): Square {
    const cellsNearShip = GetStrictNearest(square, square.filter(cell => cell.isShooted && cell.shipId))
      .filter(cell => !cell.isShooted);

    if (cellsNearShip.length) {
      return getRandomElementOfArray<Square>(cellsNearShip);
    }

    return getRandomElementOfArray<Square>(square.filter(cell => !cell.isShooted));
  }
}
