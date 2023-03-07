import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorComponentComponent } from './autor-component.component';

describe('AutorComponentComponent', () => {
  let component: AutorComponentComponent;
  let fixture: ComponentFixture<AutorComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutorComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutorComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
