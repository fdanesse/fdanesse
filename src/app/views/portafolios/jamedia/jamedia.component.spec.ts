import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JamediaComponent } from './jamedia.component';

describe('JamediaComponent', () => {
  let component: JamediaComponent;
  let fixture: ComponentFixture<JamediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JamediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JamediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
