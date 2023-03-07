import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizaCategoriaComponent } from './actualiza-categoria.component';

describe('ActualizaCategoriaComponent', () => {
  let component: ActualizaCategoriaComponent;
  let fixture: ComponentFixture<ActualizaCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizaCategoriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizaCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
