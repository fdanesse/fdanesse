import { Component, OnInit, OnDestroy } from '@angular/core';
import { FilesService } from '../../servicios/files.service';

// Construir un pipe: https://stackoverflow.com/questions/49047553/how-to-iterate-dictionary-in-angular-template

@Component({
  selector: 'app-menuarticulos',
  templateUrl: './menuarticulos.component.html',
  styleUrls: ['./menuarticulos.component.css'],
  providers: [FilesService]
})
export class MenuarticulosComponent implements OnInit, OnDestroy {

  public perfilbutton = true;

  public menu = new Array();
  // public temp;

  private menuSubscription;
  public items = new Array();
  public currentArticuloPath = '';


  constructor(public filesService: FilesService) {
    this.getMenu();
  }

  getMenu() {
    /*
    Colección MenuArticulos.
    Cada materia tiene su documento.
    Cada documento tiene un campo con su mismo nombre y un array de articulos tipo map
    */
   if (this.menuSubscription) {
      this.menuSubscription.unsubscribe();
    }
    this.menuSubscription = this.filesService.getCollection('MenuArticulos').
      subscribe(data => {
        this.menu = new Array();
        if (data) {
          // this.temp = Object.assign(data);
          data.map((val) => { // data == Array - val == Array
            for (const item in val) {
              if (item) {
                this.menu.push({key: item, value: val[item]});
              }
            }
          });

        }
      });
  }

  articuloSelected(key, event) {
    // console.log(event.target.innerHTML, key);
    this.currentArticuloPath = key + '/' + event.target.innerHTML;
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.menuSubscription) {
      this.menuSubscription.unsubscribe();
    }

    if (this.menuSubscription) {
      this.menuSubscription.unsubscribe();
    }
  }

}
