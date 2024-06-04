import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalColaboradoresTiComponent } from './modal-colaboradores-ti.component';

describe('ModalColaboradoresTiComponent', () => {
  let component: ModalColaboradoresTiComponent;
  let fixture: ComponentFixture<ModalColaboradoresTiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalColaboradoresTiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalColaboradoresTiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
