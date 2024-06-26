import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGestaoArmariosComponent } from './modal-gestao-armarios.component';

describe('ModalGestaoArmariosComponent', () => {
  let component: ModalGestaoArmariosComponent;
  let fixture: ComponentFixture<ModalGestaoArmariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalGestaoArmariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalGestaoArmariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
