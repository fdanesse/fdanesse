import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JamediaPythonComponent } from './jamedia-python.component';

describe('JamediaPythonComponent', () => {
  let component: JamediaPythonComponent;
  let fixture: ComponentFixture<JamediaPythonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JamediaPythonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JamediaPythonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
