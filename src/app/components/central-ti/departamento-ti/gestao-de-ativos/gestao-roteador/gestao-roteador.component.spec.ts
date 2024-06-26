import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoRoteadorComponent } from './gestao-roteador.component';

describe('GestaoRoteadorComponent', () => {
  let component: GestaoRoteadorComponent;
  let fixture: ComponentFixture<GestaoRoteadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestaoRoteadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestaoRoteadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
