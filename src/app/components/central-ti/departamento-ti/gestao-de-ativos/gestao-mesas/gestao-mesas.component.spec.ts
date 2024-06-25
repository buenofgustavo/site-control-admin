import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoMesasComponent } from './gestao-mesas.component';

describe('GestaoMesasComponent', () => {
  let component: GestaoMesasComponent;
  let fixture: ComponentFixture<GestaoMesasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestaoMesasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestaoMesasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
