import { TestBed } from '@angular/core/testing';

import { DesligarColaboradorService } from './desligar-colaborador.service';

describe('DesligarColaboradorService', () => {
  let service: DesligarColaboradorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesligarColaboradorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
