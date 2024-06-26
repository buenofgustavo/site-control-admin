import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoMicroondasComponent } from './gestao-microondas.component';

describe('GestaoMicroondasComponent', () => {
  let component: GestaoMicroondasComponent;
  let fixture: ComponentFixture<GestaoMicroondasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestaoMicroondasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestaoMicroondasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
