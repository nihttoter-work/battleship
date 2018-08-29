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
      length: 4,
      shipForm: 'I',
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

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
