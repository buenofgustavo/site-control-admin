import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmarFeriasComponent } from './dialog-confirmar-ferias.component';

describe('DialogConfirmarFeriasComponent', () => {
  let component: DialogConfirmarFeriasComponent;
  let fixture: ComponentFixture<DialogConfirmarFeriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConfirmarFeriasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogConfirmarFeriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
