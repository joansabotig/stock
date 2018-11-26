import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRubroComponent } from './lista-rubro.component';

describe('ListaRubroComponent', () => {
  let component: ListaRubroComponent;
  let fixture: ComponentFixture<ListaRubroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaRubroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaRubroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
