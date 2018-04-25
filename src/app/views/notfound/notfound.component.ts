import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notfound',
  template: `
  <div id='home_button'><a routerLink='/home'><i class="fa fa-home fa-2x"></i></a></div>
  <div class='container'>
    <p>La dirección solicitada no contiene una página válida.</p>
    <p>Es posible que actualmente esté en mantenimiento o tal vez, hallas ingresado mal la dirección.</p>
  </div>
  `,
  styles: ['.container {background-color: black; color: white; margin: auto; padding:20px;}',
    '.container {width: 100vw !important; heigh: 100vh !important;}',
    '.container {font-family: Josefin Slab, serif; font-size: 16pt;}',
    'p {text-align: center;}',
    '#home_button {float:left; margin: 0.4em; position: absolute; z-index: 1;}',
    '.fa-home {color:white;}',
    '.fa-home:hover {cursor: pointer; color: cyan; text-shadow: 0.025em 0.025em 0.025em black !important;}'
  ]
})
export class NotfoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
