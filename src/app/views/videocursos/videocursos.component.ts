import { Component, OnInit, OnDestroy } from '@angular/core';
import { FilesService } from '../../servicios/files.service';


@Component({
  selector: 'app-videocursos',
  templateUrl: './videocursos.component.html',
  styleUrls: ['./videocursos.component.css'],
  providers: [FilesService]
})
export class VideocursosComponent implements OnInit, OnDestroy {

  public perfilbutton = true;

  lenguajes = new Array();
  currentLenguaje;
  currentCursos = new Array();
  currentVideos = new Array();
  currentCurso;
  currentVideo;
  assets = new Array();
  videoURL = '';
  titulo = '';

  widgetLenguajeselected;
  widgetCursoselected;
  widgetVideoselected;

  lenguajesSubscription;
  temasSubscription;

  // temp;

  constructor(public filesService: FilesService) {
    this.getLenguajes();
  }

  getLenguajes() {
    // Guias tiene un Array de Documentos. Uno para cada lenguaje.
    if (this.lenguajesSubscription) {
      this.lenguajesSubscription.unsubscribe();
    }
    this.lenguajesSubscription = this.filesService.getCollection('Cursos y Videos').
      subscribe(data => {
        this.lenguajes = new Array();
        if (data) {
          // this.temp = Object.assign(data);
          data.map((val) => { // data == Array - val == Array
            for (const leng in val) {
              if (leng) {
                this.lenguajes.push(leng);
              }
            }
          });
        }
      });
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.temasSubscription) {
      this.temasSubscription.unsubscribe();
    }
    if (this.lenguajesSubscription) {
      this.lenguajesSubscription.unsubscribe();
    }
  }

  lenguajeSelected(event) {
    // El usuario selecciona un lenguaje
    if (this.currentLenguaje === event.target.innerHTML) {
      return;
    }
    this.currentCursos = new Array();
    this.currentVideos = new Array();
    this.currentLenguaje = event.target.innerHTML;
    const widget = event.target as HTMLElement;
    if (this.widgetLenguajeselected) {
      this.widgetLenguajeselected.classList.remove('selected');
    }
    this.widgetLenguajeselected = widget;
    this.widgetLenguajeselected.classList.add('selected');

    if (this.temasSubscription) {
      this.temasSubscription.unsubscribe();
    }
    this.temasSubscription = this.filesService.getDocument('Cursos y Videos', this.currentLenguaje).
      subscribe(data => {
        this.currentCursos = new Array();
        if (data) {
          const obj = data[this.currentLenguaje];
          for (const leng in obj) {
            if (leng) {
              this.currentCursos.push([obj[leng]['DirPath'], obj[leng]['files']]); // obj[leng]['DirPath'] {DirPath: ?, files: []?}
            }
          }
        }
      });

  }

  cursoSelected(event) {
    // El usuario selecciona una serie de lecciones
    const curso = event.target.innerHTML;
    this.currentCurso = curso;
    this.currentVideos = new Array();
    const widget = event.target as HTMLElement;
    if (this.widgetCursoselected) {
      this.widgetCursoselected.classList.remove('selected');
    }
    this.widgetCursoselected = widget;
    this.widgetCursoselected.classList.add('selected');

    for (const lec in this.currentCursos) {
      if (this.currentCursos[lec][0] === curso) {
        for (const videos of this.currentCursos[lec][1]) {
          this.currentVideos.push(videos);
        }
        break;
      }
    }
  }

  videoSelected(event) {
    // El usuario selecciona una lección
    const video = event.target.innerHTML;
    this.assets = new Array();
    const widget = event.target as HTMLElement;
    if (this.widgetVideoselected) {
      this.widgetVideoselected.classList.remove('selected');
    }
    this.widgetVideoselected = widget;
    this.widgetVideoselected.classList.add('selected');

    // Cursos y Videos/Angular/01 - Angular Cli/01 - What is Angular CLI-rJ9o4TyhSuo.webm
    for (const id in this.currentVideos) {
      if (this.currentVideos[id].Titulo === video) {
        this.titulo = this.currentLenguaje + ' - ' + video;
        this.currentVideo = 'Cursos y Videos/' + this.currentLenguaje + '/' + this.currentCurso + '/' + this.currentVideos[id].path;

        this.assets = this.currentVideos[id]['assets'] || new Array(); // FIXME: cambiar path por getDownloadURL
        for (const asset of this.assets) {
          const path = 'Cursos y Videos/' + this.currentLenguaje + '/' + this.currentCurso + '/' + asset.path;
          const ref = this.filesService.getStorageDirectoryReference(path);
          ref.getDownloadURL()
            .then(success => {
              // console.log(success);
              asset.path = success;
              })
            .catch(err => console.log('ERROR getDocumentLesson:', err));
        }

        this.getDocumentVideo();
        break;
      }
    }
  }

  getDocumentVideo() {
    // Se carga el Documento de la lección seleccionada
    this.videoURL = '';
    const ref = this.filesService.getStorageDirectoryReference(this.currentVideo);
    ref.getDownloadURL()
      .then(success => {
        // console.log(success);
        this.videoURL = success;
        })
      .catch(err => console.log('ERROR getDocumentLesson:', err));
  }

}
