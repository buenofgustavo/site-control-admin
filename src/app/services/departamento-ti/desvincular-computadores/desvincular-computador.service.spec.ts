import { TestBed } from '@angular/core/testing';

import { DesvincularComputadorService } from './desvincular-computador.service';

describe('DesvincularComputadorService', () => {
  let service: DesvincularComputadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesvincularComputadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
