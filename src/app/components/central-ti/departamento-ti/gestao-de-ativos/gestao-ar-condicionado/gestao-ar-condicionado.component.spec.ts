import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoArCondicionadoComponent } from './gestao-ar-condicionado.component';

describe('GestaoArCondicionadoComponent', () => {
  let component: GestaoArCondicionadoComponent;
  let fixture: ComponentFixture<GestaoArCondicionadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestaoArCondicionadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestaoArCondicionadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
