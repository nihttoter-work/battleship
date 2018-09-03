import { IEnvironment } from './environment-interface';

export const environment: IEnvironment = {
  production: true,
  squareWidth: 10,
  squareHeight: 10,
  testMode: false,
  ships: [
    {
      shipForm: 'L',
    },
    {
      length: 4,
      shipForm: 'I',
    },
    {
      length: 1,
      shipForm: 'I',
    },
    {
      length: 1,
      shipForm: 'I',
    },
  ],
};
