import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaboradoresTiComponent } from './colaboradores-ti.component';

describe('ColaboradoresTiComponent', () => {
  let component: ColaboradoresTiComponent;
  let fixture: ComponentFixture<ColaboradoresTiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColaboradoresTiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColaboradoresTiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
