import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComputadoresTiComponent } from './modal-computadores-ti.component';

describe('ModalComputadoresTiComponent', () => {
  let component: ModalComputadoresTiComponent;
  let fixture: ComponentFixture<ModalComputadoresTiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalComputadoresTiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalComputadoresTiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
