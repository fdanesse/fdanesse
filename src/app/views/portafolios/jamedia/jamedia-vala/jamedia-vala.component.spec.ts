import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JamediaValaComponent } from './jamedia-vala.component';

describe('JamediaValaComponent', () => {
  let component: JamediaValaComponent;
  let fixture: ComponentFixture<JamediaValaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JamediaValaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JamediaValaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
