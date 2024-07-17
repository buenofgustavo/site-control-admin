import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatoriosComprasComponent } from './relatorios-compras.component';

describe('RelatoriosComprasComponent', () => {
  let component: RelatoriosComprasComponent;
  let fixture: ComponentFixture<RelatoriosComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatoriosComprasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatoriosComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
