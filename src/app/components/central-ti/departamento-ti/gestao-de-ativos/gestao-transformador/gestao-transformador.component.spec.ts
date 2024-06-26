import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoTransformadorComponent } from './gestao-transformador.component';

describe('GestaoTransformadorComponent', () => {
  let component: GestaoTransformadorComponent;
  let fixture: ComponentFixture<GestaoTransformadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestaoTransformadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestaoTransformadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
