import { TestBed } from '@angular/core/testing';

import { DepartamentoFiliaisService } from './departamento-filiais.service';

describe('DepartamentoFiliaisService', () => {
  let service: DepartamentoFiliaisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartamentoFiliaisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
