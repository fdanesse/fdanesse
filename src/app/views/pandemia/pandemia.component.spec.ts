import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PandemiaComponent } from './pandemia.component';

describe('PandemiaComponent', () => {
  let component: PandemiaComponent;
  let fixture: ComponentFixture<PandemiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PandemiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PandemiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
