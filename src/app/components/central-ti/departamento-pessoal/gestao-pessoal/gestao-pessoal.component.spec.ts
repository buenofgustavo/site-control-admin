import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoPessoalComponent } from './gestao-pessoal.component';

describe('GestaoPessoalComponent', () => {
  let component: GestaoPessoalComponent;
  let fixture: ComponentFixture<GestaoPessoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestaoPessoalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestaoPessoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
