import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaDetallesComponent } from './categoria-detalles.component';

describe('CategoriaDetallesComponent', () => {
  let component: CategoriaDetallesComponent;
  let fixture: ComponentFixture<CategoriaDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriaDetallesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriaDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
