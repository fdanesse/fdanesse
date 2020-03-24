import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs'; // Observable
import { FilesService } from '../../servicios/files.service';


@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent implements OnInit {

  @Input()
  public articulo;
  // "Informática/El origen de la Informática"
  // "El origen de la Informática" es el titulo del elemento map correspondiente en el array Informática
  // Coleccion: MenuArticulos
  // Documento: Informática
  // Array: Informática con indice entero. Cada elemento tiene un titulo

  // se necesita observer sobre MenuArticulos/Informatica[Informática]

  private documento: Subscription;
  public listaElementosdelArticulo = new Array();

  constructor(public fileService: FilesService) { }

  ngOnInit() {
    this.listenDocument();
  }

  listenDocument() {
    if (this.documento) {
      this.documento.unsubscribe();
    }
    this.documento = this.fileService.getDocument('MenuArticulos', this.articulo[0])
      .subscribe( doc => {
        if (doc) {
          for (const d in doc[this.articulo[0]]){
            let item = doc[this.articulo[0]][d];
            if (item['titulo'] === this.articulo[1]) {
              // console.log(item);
              this.listaElementosdelArticulo = Object.assign(item['contenido']);
              /*
              console.log(this.listaElementosdelArticulo);
              console.log(this.listaElementosdelArticulo[0]['tipo'] === 'texto');
              */
              break;
            }
          }
        }
    });
  }

}
