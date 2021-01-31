import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  @Output() // https://ciphertrick.com/2017/07/24/parent-child-component-communication-angular/
  closeEvent: EventEmitter<null> = new EventEmitter<null>(); // creating an output event
  @Input()
  public user;

  constructor() { }

  ngOnInit() {
  }

  close() {
    this.closeEvent.emit(null);
  }

}
