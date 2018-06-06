import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { FilesService } from '../../servicios/files.service';


@Component({
  selector: 'app-videocursos',
  templateUrl: './videocursos.component.html',
  styleUrls: ['./videocursos.component.css'],
  providers: [FilesService]
})
export class VideocursosComponent implements OnInit, OnDestroy {

  lenguajes = [];
  currentLenguaje;
  currentTemas = [];
  currentVideos = [];
  currentLesson;
  currentVideo;
  videoURL = '';
  titulo = '';
  selected = [];

  lenguajesSubscription;
  temasSubscription;

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
        this.lenguajes = [];
        if (data) {
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

  ngOnInit() { }

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
    this.currentTemas = [];
    this.currentVideos = [];
    this.currentLenguaje = event.target.innerHTML;
    const widget = event.target as HTMLElement;
    if (!this.selected.includes(widget)) {
      this.selected.forEach(element => {
        element.classList.remove('selected');
      });
      this.selected = [];
      widget.classList.add('selected');
      this.selected.push(widget);
    }

    if (this.temasSubscription) {
      this.temasSubscription.unsubscribe();
    }
    this.temasSubscription = this.filesService.getDocument('Cursos y Videos', this.currentLenguaje).
      subscribe(data => {
        this.currentTemas = [];
        if (data) {
          const obj = data[this.currentLenguaje];
          for (const leng in obj) {
            if (leng) {
              this.currentTemas.push([obj[leng]['DirPath'], obj[leng]['files']]); // obj[leng]['DirPath'] {DirPath: ?, files: []?}
            }
          }
        }
      });

  }

  leccionSelected(event) {
    // El usuario selecciona una serie de lecciones
    const lesson = event.target.innerHTML;
    this.currentLesson = lesson;
    this.currentVideos = [];
    const widget = event.target as HTMLElement;
    if (!this.selected.includes(widget)) {
      if (this.selected.length > 1) {
        const w = this.selected.pop();
        w.classList.remove('selected');
      }
      widget.classList.add('selected');
      this.selected.push(widget);
    }

    for (const lec in this.currentTemas) {
      if (this.currentTemas[lec][0] === lesson) {
        for (const videos of this.currentTemas[lec][1]) {
          this.currentVideos.push(videos);
        }
        break;
      }
    }
  }

  videoSelected(event) {
    // El usuario selecciona una lección
    const lesson = event.target.innerHTML;
    const widget = event.target as HTMLElement;
    if (!this.selected.includes(widget)) {
      if (this.selected.length > 1) {
        const w = this.selected.pop();
        w.classList.remove('selected');
      }
      widget.classList.add('selected');
      this.selected.push(widget);
    }

    // Cursos y Videos/Angular/01 - Angular Cli/01 - What is Angular CLI-rJ9o4TyhSuo.webm
    for (const id in this.currentVideos) {
      if (this.currentVideos[id].Titulo === lesson) {
        this.titulo = this.currentLenguaje + ' - ' + lesson;
        this.currentVideo = 'Cursos y Videos/' + this.currentLenguaje + '/' + this.currentLesson + '/' + this.currentVideos[id].path;
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
        console.log(success);
        this.videoURL = success;
        })
      .catch(err => console.log('ERROR getDocumentLesson:', err));
  }

}
