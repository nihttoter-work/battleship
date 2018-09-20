import { Square } from '../models/square';

export function GetNearest(square: Square[], cells: Square[]): Square[] {
  return [].concat(
    ...cells.map(cell =>
      square.filter(
        item =>
          item.x >= cell.x - 1 &&
          item.x <= cell.x + 1 &&
          item.y >= cell.y - 1 &&
          item.y <= cell.y + 1,
      ),
    ),
  );
}

export function GetStrictNearest(square: Square[], cells: Square[]): Square[] {
  return [].concat(
    ...cells.map(cell =>
      square.filter(
        item =>
          (
            item.x >= cell.x - 1 &&
            item.x <= cell.x + 1 &&
            item.y === cell.y
          ) ||
          (
            item.y >= cell.y - 1 &&
            item.y <= cell.y + 1 &&
            item.x === cell.x
          )
      ),
    ),
  );
}
