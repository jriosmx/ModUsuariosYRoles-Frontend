import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorialDetallesComponent } from './editorial-detalles.component';

describe('EditorialDetallesComponent', () => {
  let component: EditorialDetallesComponent;
  let fixture: ComponentFixture<EditorialDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorialDetallesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorialDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
