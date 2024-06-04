import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGestaoImpressorasComponent } from './modal-gestao-impressoras.component';

describe('ModalGestaoImpressorasComponent', () => {
  let component: ModalGestaoImpressorasComponent;
  let fixture: ComponentFixture<ModalGestaoImpressorasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalGestaoImpressorasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalGestaoImpressorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
