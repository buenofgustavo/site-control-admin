import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaboradoresComprasComponent } from './colaboradores-compras.component';

describe('ColaboradoresComprasComponent', () => {
  let component: ColaboradoresComprasComponent;
  let fixture: ComponentFixture<ColaboradoresComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColaboradoresComprasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColaboradoresComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
