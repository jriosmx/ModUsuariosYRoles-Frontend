import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarAutorComponentComponent } from './actualizar-autor-component.component';

describe('ActualizarAutorComponentComponent', () => {
  let component: ActualizarAutorComponentComponent;
  let fixture: ComponentFixture<ActualizarAutorComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarAutorComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarAutorComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
