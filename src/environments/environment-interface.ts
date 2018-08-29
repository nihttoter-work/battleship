export interface IEnvironment {
    production: boolean;
    squareWidth: number;
    squareHeight: number;
    testMode: boolean;
    ships: {
        length: number;
        shipForm: 'I' | 'L';
    }[];
}