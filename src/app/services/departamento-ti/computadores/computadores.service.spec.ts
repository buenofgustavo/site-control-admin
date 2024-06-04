import { TestBed } from '@angular/core/testing';

import { ComputadoresService } from './computadores.service';

describe('ComputadoresService', () => {
  let service: ComputadoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComputadoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
