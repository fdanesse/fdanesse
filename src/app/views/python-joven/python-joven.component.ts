import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-python-joven',
  templateUrl: './python-joven.component.html',
  styleUrls: ['./python-joven.component.css']
})
export class PythonJovenComponent implements OnInit {

  public copyrigth = '';

  constructor() { }

  ngOnInit() {
    const d = new Date();
    this.copyrigth = d.getFullYear() + '';
  }

}
