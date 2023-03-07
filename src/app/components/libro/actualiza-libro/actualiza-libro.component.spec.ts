import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizaLibroComponent } from './actualiza-libro.component';

describe('ActualizaLibroComponent', () => {
  let component: ActualizaLibroComponent;
  let fixture: ComponentFixture<ActualizaLibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizaLibroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizaLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
