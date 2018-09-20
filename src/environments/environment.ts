import { IEnvironment } from './environment-interface';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment: IEnvironment = {
  production: false,
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
  ]
};
