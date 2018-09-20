import { Injectable } from '@angular/core';
import { Square } from '../models/square';
import { Ship } from '../models/ship';
import * as Random from './../utils/random';
import * as CellsUtils from './../utils/cells';

@Injectable({
  providedIn: 'root',
})
export class ShipService {
  constructor() {}

  generateShips(square: Square[], ships: Ship[]): Square[] {
    let newSquare: Square[] = square;
    ships.forEach(ship => {
      newSquare = this.generateShip(newSquare, ship);
    });
    return newSquare;
  }

  generateShip(square: Square[], ship: Ship): Square[] {
    const cells: any[] = square.filter(cell => !cell.isOccupied).map(cell => {
      return { ...cell, checked: false };
    });

    while (cells.some(cell => !cell.checked)) {
      const randomCell: Square = cells[Random.getRandomNumber(cells.length - 1)];
      const isVertical: boolean = Random.getRandomBoolean();

      let newSquare: Square[];
      if (ship.shipForm === 'I') {
        if (isVertical) {
          newSquare =
            this.trySetIShipVerticaly(square, ship, randomCell) ||
            this.trySetIShipHorisontaly(square, ship, randomCell);
        } else {
          newSquare =
            this.trySetIShipHorisontaly(square, ship, randomCell) ||
            this.trySetIShipVerticaly(square, ship, randomCell);
        }
      }
      if (ship.shipForm === 'L') {
        if (isVertical) {
          newSquare =
            this.trySetLShipVerticaly(square, ship, randomCell) ||
            this.trySetLShipHorisontaly(square, ship, randomCell);
        } else {
          newSquare =
            this.trySetLShipHorisontaly(square, ship, randomCell) ||
            this.trySetLShipVerticaly(square, ship, randomCell);
        }
      }

      if (newSquare) {
        return newSquare;
      }

      if (!newSquare) {
        (randomCell as any).checked = true;
      }
    }
  }

  trySetIShipVerticaly(square: Square[], ship: Ship, startPossition: Square): Square[] {
    const cells = [...square];
    const isPossibleToSet =
      ship.length ===
      cells.filter(
        (cell: Square) =>
          !cell.isOccupied &&
          cell.x === startPossition.x &&
          cell.y >= startPossition.y &&
          cell.y < startPossition.y + ship.length,
      ).length;

    if (!isPossibleToSet) {
      return null;
    }

    cells
      .filter(
        cell =>
          cell.y >= startPossition.y - 1 &&
          cell.y <= startPossition.y + ship.length &&
          cell.x >= startPossition.x - 1 &&
          cell.x <= startPossition.x + 1,
      )
      .forEach(cell => {
        cell.isOccupied = true;
      });

    cells
      .filter(
        cell =>
          cell.x === startPossition.x &&
          cell.y >= startPossition.y &&
          cell.y < startPossition.y + ship.length,
      )
      .forEach(cell => {
        cell.shipId = ship.id;
        ship.squares.push(cell);
      });

    return cells;
  }

  trySetIShipHorisontaly(square: Square[], ship: Ship, startPossition: Square): Square[] {
    const cells = [...square];
    const isPossibleToSet =
      ship.length ===
      cells.filter(
        (cell: Square) =>
          !cell.isOccupied &&
          cell.y === startPossition.y &&
          cell.x >= startPossition.x &&
          cell.x < startPossition.x + ship.length,
      ).length;

    if (!isPossibleToSet) {
      return null;
    }

    cells
      .filter(
        cell =>
          cell.x >= startPossition.x - 1 &&
          cell.x <= startPossition.x + ship.length &&
          cell.y >= startPossition.y - 1 &&
          cell.y <= startPossition.y + 1,
      )
      .forEach(cell => (cell.isOccupied = true));

    cells
      .filter(
        cell =>
          cell.y === startPossition.y &&
          cell.x >= startPossition.x &&
          cell.x < startPossition.x + ship.length,
      )
      .forEach(cell => {
        cell.shipId = ship.id;
        ship.squares.push(cell);
      });

    return cells;
  }

  trySetLShipVerticaly(square: Square[], ship: Ship, startPossition: Square) {
    const cells = [...square];
    let possibleCells = cells
      .filter(
        (cell: Square) =>
          !cell.isOccupied &&
          cell.x >= startPossition.x &&
          cell.x <= startPossition.x + 1 &&
          cell.y >= startPossition.y &&
          cell.y <= startPossition.y + 2,
      )
      .sort((a, b) => (a.y > b.y ? 1 : -1));
    const isPossibleToSet = 6 === possibleCells.length;

    if (!isPossibleToSet) {
      return null;
    }

    const cellsToRemove = [[0, 2], [2, 4], [1, 3], [3, 5]][Random.getRandomNumber(4)];

    possibleCells = possibleCells.filter(
      (cell, index) => index !== cellsToRemove[0] && index !== cellsToRemove[1],
    );

    possibleCells.forEach(cell => {
      cell.shipId = ship.id;
      ship.squares.push(cell);
    });
    CellsUtils.GetNearest(cells, possibleCells).forEach(cell => (cell.isOccupied = true));

    return cells;
  }

  trySetLShipHorisontaly(square: Square[], ship: Ship, startPossition: Square) {
    const cells = [...square];
    let possibleCells = cells
      .filter(
        (cell: Square) =>
          !cell.isOccupied &&
          cell.x >= startPossition.x &&
          cell.x <= startPossition.x + 2 &&
          cell.y >= startPossition.y &&
          cell.y <= startPossition.y + 1,
      )
      .sort((a, b) => (a.y > b.y ? 1 : -1));
    const isPossibleToSet = 6 === possibleCells.length;

    if (!isPossibleToSet) {
      return null;
    }

    const cellsToRemove = [[0, 1], [1, 2], [3, 4], [4, 5]][Random.getRandomNumber(4)];

    possibleCells = possibleCells.filter(
      (cell, index) => index !== cellsToRemove[0] && index !== cellsToRemove[1],
    );

    possibleCells.forEach(cell => {
      cell.shipId = ship.id;
      ship.squares.push(cell);
    });
    CellsUtils.GetNearest(cells, possibleCells).forEach(cell => (cell.isOccupied = true));

    return cells;
  }
}
