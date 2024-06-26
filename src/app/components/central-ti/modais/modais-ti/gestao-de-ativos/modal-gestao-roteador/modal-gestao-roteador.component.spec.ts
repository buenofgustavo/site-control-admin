import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGestaoRoteadorComponent } from './modal-gestao-roteador.component';

describe('ModalGestaoRoteadorComponent', () => {
  let component: ModalGestaoRoteadorComponent;
  let fixture: ComponentFixture<ModalGestaoRoteadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalGestaoRoteadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalGestaoRoteadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
