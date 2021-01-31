import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideocursosComponent } from './videocursos.component';

describe('VideocursosComponent', () => {
  let component: VideocursosComponent;
  let fixture: ComponentFixture<VideocursosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideocursosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideocursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
