import { TestBed } from '@angular/core/testing';

import { ChamadosService } from './chamados.service';

describe('ChamadosService', () => {
  let service: ChamadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChamadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
