import { TestBed, inject } from '@angular/core/testing';

import { ShipService } from './ship.service';

describe('ShipService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShipService]
    });
  });

  it('should be created', inject([ShipService], (service: ShipService) => {
    expect(service).toBeTruthy();
  }));
});
