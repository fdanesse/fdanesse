import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent implements OnInit {

  @Input()
  public articuloPath;

  constructor() { }

  ngOnInit() {
  }

}
