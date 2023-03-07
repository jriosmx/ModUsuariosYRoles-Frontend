import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizaEditorialComponent } from './actualiza-editorial.component';

describe('ActualizaEditorialComponent', () => {
  let component: ActualizaEditorialComponent;
  let fixture: ComponentFixture<ActualizaEditorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizaEditorialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizaEditorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
