import { TestBed } from '@angular/core/testing';

import { RegistroDiarioService } from './registro-diario.service';

describe('RegistroDiarioService', () => {
  let service: RegistroDiarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroDiarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
