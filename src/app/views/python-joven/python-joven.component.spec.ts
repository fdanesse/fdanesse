import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PythonJovenComponent } from './python-joven.component';

describe('PythonJovenComponent', () => {
  let component: PythonJovenComponent;
  let fixture: ComponentFixture<PythonJovenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PythonJovenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PythonJovenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
