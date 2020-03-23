import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuarticulosComponent } from './menuarticulos.component';

describe('MenuarticulosComponent', () => {
  let component: MenuarticulosComponent;
  let fixture: ComponentFixture<MenuarticulosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuarticulosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuarticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
