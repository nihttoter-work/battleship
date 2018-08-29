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

  generateShips(square: Square[], ships: Ship[]): Square[] {
    let newSquare: Square[] = square;
    ships.forEach(ship => {
      newSquare = this.generateShip(newSquare, ship);
    });
    return newSquare;
  }

  generateShip(square: Square[], ship: Ship): Square[] {
    const cells: any[] = square
      .filter(cell => !cell.isOccupied)
      .map(cell => {
        return {...cell, checked: false};
      });

    while (cells.some(cell => !cell.checked)) {
      const randomCell: Square = cells[Random.getRandomNumber(cells.length - 1)];
      const isVertical: boolean = Random.getRandomBoolean();

      let newSquare: Square[];
      if (ship.shipForm === 'I') {
        if (isVertical) {
          newSquare = this.trySetIShipVerticaly(square, ship, randomCell) || this.trySetIShipHorisontaly(square, ship, randomCell);
        } else {
          newSquare = this.trySetIShipHorisontaly(square, ship, randomCell) || this.trySetIShipVerticaly(square, ship, randomCell);
        }

        if (newSquare) {
          return newSquare;
        }

        if (!newSquare) {
          (randomCell as any).checked = true;
        }
      }
    }
  }

  trySetIShipVerticaly(square: Square[], ship: Ship, startPossition: Square): Square[] {
    const cells = [...square];
    const isPossibleToSet = ship.length === cells
      .filter((cell: Square) =>
        !cell.isOccupied &&
        cell.x === startPossition.x &&
        cell.y >= startPossition.y &&
        cell.y < startPossition.y + ship.length
      ).length;

    if (!isPossibleToSet) {
      return null;
    }

    cells
      .filter(cell =>
        cell.y >= startPossition.y - 1 &&
        cell.y <= startPossition.y + ship.length &&
        cell.x >= startPossition.x - 1 &&
        cell.x <= startPossition.x + 1
      )
      .forEach(cell => {
        cell.isOccupied = true;
      });

    cells
      .filter(cell =>
        cell.x === startPossition.x &&
        cell.y >= startPossition.y &&
        cell.y < startPossition.y + ship.length)
      .forEach(cell => {
        cell.shipId = ship.id;
        ship.squares.push(cell);
      });

    return cells;
  }

  trySetIShipHorisontaly(square: Square[], ship: Ship, startPossition: Square): Square[] {
    const cells = [...square];
    const isPossibleToSet = ship.length === cells
      .filter((cell: Square) =>
        !cell.isOccupied &&
        cell.y === startPossition.y &&
        cell.x >= startPossition.x &&
        cell.x < startPossition.x + ship.length
      ).length;

    if (!isPossibleToSet) {
      return null;
    }

    cells
      .filter(cell =>
        cell.x >= startPossition.x - 1 &&
        cell.x <= startPossition.x + ship.length &&
        cell.y >= startPossition.y - 1 &&
        cell.y <= startPossition.y + 1
      )
      .forEach(cell => cell.isOccupied = true);

    cells
      .filter(cell =>
        cell.y === startPossition.y &&
        cell.x >= startPossition.x &&
        cell.x < startPossition.x + ship.length)
      .forEach(cell => {
        cell.shipId = ship.id;
        ship.squares.push(cell);
      });

    return cells;
  }
}
