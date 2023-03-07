import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizaUsuarioComponent } from './actualiza-usuario.component';

describe('ActualizaUsuarioComponent', () => {
  let component: ActualizaUsuarioComponent;
  let fixture: ComponentFixture<ActualizaUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizaUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
