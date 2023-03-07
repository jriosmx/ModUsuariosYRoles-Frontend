import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorDetallesComponent } from './autor-detalles.component';

describe('AutorDetallesComponent', () => {
  let component: AutorDetallesComponent;
  let fixture: ComponentFixture<AutorDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutorDetallesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutorDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
