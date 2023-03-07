import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEditorialesComponent } from './lista-editoriales.component';

describe('ListaEditorialesComponent', () => {
  let component: ListaEditorialesComponent;
  let fixture: ComponentFixture<ListaEditorialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaEditorialesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaEditorialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
