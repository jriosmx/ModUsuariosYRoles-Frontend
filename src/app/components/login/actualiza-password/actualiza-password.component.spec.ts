import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizaPasswordComponent } from './actualiza-password.component';

describe('ActualizaPasswordComponent', () => {
  let component: ActualizaPasswordComponent;
  let fixture: ComponentFixture<ActualizaPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizaPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizaPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
