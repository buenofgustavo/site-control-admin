import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGestaoMonitoresComponent } from './modal-gestao-monitores.component';

describe('ModalGestaoMonitoresComponent', () => {
  let component: ModalGestaoMonitoresComponent;
  let fixture: ComponentFixture<ModalGestaoMonitoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalGestaoMonitoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalGestaoMonitoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
