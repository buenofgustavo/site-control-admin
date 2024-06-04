import { TestBed } from '@angular/core/testing';

import { MudancaDeCargoService } from './mudanca-de-cargo.service';

describe('MudancaDeCargoService', () => {
  let service: MudancaDeCargoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MudancaDeCargoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
