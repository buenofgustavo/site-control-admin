import { TestBed } from '@angular/core/testing';

import { VincularComputadorService } from './vincular-computador.service';

describe('VincularComputadorService', () => {
  let service: VincularComputadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VincularComputadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
