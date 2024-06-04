import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoPessoalTiComponent } from './gestao-pessoal-ti.component';

describe('GestaoPessoalTiComponent', () => {
  let component: GestaoPessoalTiComponent;
  let fixture: ComponentFixture<GestaoPessoalTiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestaoPessoalTiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestaoPessoalTiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
