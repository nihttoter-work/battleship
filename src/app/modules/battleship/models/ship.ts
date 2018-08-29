import { ShipForm } from './ship-form';
import { Square } from './square';
import { ShipState } from './ship-state';

export class Ship {
    id: number;
    shipForm: ShipForm;
    length: number;
    squares: Square[];

    get shipState(): ShipState {
        if (!this.squares) {
            return null;
        }

        if (this.squares.every((element) => !element.isShooted)) {
            return 'unharmed';
        }

        if (this.squares.every((element) => element.isShooted)) {
            return 'killed';
        }

        if (this.squares.some((element) => element.isShooted)) {
            return 'harmed';
        }

        return null;
    }

    constructor(
        id,
        length,
        shipForm,
    ) {
        this.id = id;
        this.length = length;
        this.shipForm = shipForm;
        this.squares = [];
    }
}
