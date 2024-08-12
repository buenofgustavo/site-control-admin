import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDiarioComponent } from './registro-diario.component';

describe('RegistroDiarioComponent', () => {
  let component: RegistroDiarioComponent;
  let fixture: ComponentFixture<RegistroDiarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroDiarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroDiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
