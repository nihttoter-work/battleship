import { Injectable } from '@angular/core';
import { Square } from '../models/square';

@Injectable({
  providedIn: 'root'
})
export class SquareService {
  square: Square[];

  constructor() { }

  generateSquare(width: number, height: number): Square[] {
    const square: Square[] = [];

    for (let i = 0; i < width; i++) {
      for (let j = 0; j < width; j++) {
        square.push({
          x: i,
          y: j,
          isShooted: false,
          isOccupied: false,
          shipId: null,
        });
      }
    }

    return square;
  }
}
