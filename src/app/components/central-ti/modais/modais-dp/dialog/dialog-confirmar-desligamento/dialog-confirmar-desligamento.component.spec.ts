import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmarDesligamentoComponent } from './dialog-confirmar-desligamento.component';

describe('DialogConfirmarDesligamentoComponent', () => {
  let component: DialogConfirmarDesligamentoComponent;
  let fixture: ComponentFixture<DialogConfirmarDesligamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConfirmarDesligamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogConfirmarDesligamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
