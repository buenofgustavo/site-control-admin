import { TestBed } from '@angular/core/testing';

import { ExportRelatoriosComprasService } from './export-relatorios-compras.service';

describe('ExportRelatoriosComprasService', () => {
  let service: ExportRelatoriosComprasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportRelatoriosComprasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
