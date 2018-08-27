import { Injectable } from '@angular/core';
import { Square } from '../models/square';
import { Ship } from '../models/ship';
import { ShipForm } from '../models/ship-form';

@Injectable({
  providedIn: 'root'
})
export class ShipService {

  constructor() { }

  generateShips(square: Square[][], ship: Ship[]): Ship[] {
    return [];
  }

  generateShip(square: Square[][], form: ShipForm, length: number) {
    
  }

  findNotOccupiedPossition(square: Square[][]) {
    
  }
}
