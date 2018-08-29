import { Square } from '../models/square';

export function getNearestCells(square: Square[], cells: Square[]): Square[] {
    let output: Square[] = [];

    cells.forEach(cell => {
        output = [...square
            .filter(squareCell =>
                squareCell.y >= cell.y - 1 &&
                squareCell.y <= cell.y + 1 &&
                squareCell.x >= cell.x - 1 &&
                squareCell.x <= cell.x + 1
            ), ...output];
    });

    return output;
}