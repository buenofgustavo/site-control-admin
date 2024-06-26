import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGestaoCadeirasComponent } from './modal-gestao-cadeiras.component';

describe('ModalGestaoCadeirasComponent', () => {
  let component: ModalGestaoCadeirasComponent;
  let fixture: ComponentFixture<ModalGestaoCadeirasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalGestaoCadeirasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalGestaoCadeirasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
