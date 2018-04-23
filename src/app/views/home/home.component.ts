import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // FIXME: Un Ejemplo interesante de animaciones
  // <div class="divider" #divider></div>
  // import { ViewChild, ElementRef } from '@angular/core';
  // @ViewChild('divider') divider: ElementRef; // this.divider.nativeElement
  // https://stackoverflow.com/questions/42591822/angular-2-access-an-element-from-the-component-getdocumentbyid-doesnt-work

  constructor() { }

  ngOnInit() {
  }

}
