import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoImpressorasComponent } from './gestao-impressoras.component';

describe('GestaoImpressorasComponent', () => {
  let component: GestaoImpressorasComponent;
  let fixture: ComponentFixture<GestaoImpressorasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestaoImpressorasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestaoImpressorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
