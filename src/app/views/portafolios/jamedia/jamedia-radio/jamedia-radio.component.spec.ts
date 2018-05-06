import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JamediaRadioComponent } from './jamedia-radio.component';

describe('JamediaRadioComponent', () => {
  let component: JamediaRadioComponent;
  let fixture: ComponentFixture<JamediaRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JamediaRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JamediaRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
