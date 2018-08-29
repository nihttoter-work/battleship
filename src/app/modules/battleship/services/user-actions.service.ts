import { Injectable } from '@angular/core';
import { Square } from '../models/square';
import { Ship } from '../models/ship';

@Injectable({
  providedIn: 'root'
})
export class UserActionsService {

  constructor() { }

  shoot(square: Square[], ships: Ship[], cell: Square) {
    cell.isShooted = true;
    const isShipKilled = cell.shipId && ships.find(ship => ship.id === cell.shipId).shipState === 'killed';
    if (isShipKilled) {
      const killedShip = ships.find(ship => ship.id === cell.shipId);
      killedShip.squares.forEach(shipCell => {
        square
        .filter(squareCell =>
          squareCell.y >= shipCell.y - 1 &&
          squareCell.y <= shipCell.y + 1 &&
          squareCell.x >= shipCell.x - 1 &&
          squareCell.x <= shipCell.x + 1
        ).forEach(nearestCell => nearestCell.isShooted = true)
      });
    }
  }
}
