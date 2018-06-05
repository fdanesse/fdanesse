import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CurriculumComponent } from './views/curriculum/curriculum.component';
import { PortafoliosComponent } from './views/portafolios/portafolios.component';
import { JamediaComponent } from './views/portafolios/jamedia/jamedia.component';
import { NotfoundComponent } from './views/notfound/notfound.component';
import { JamediaPythonComponent } from './views/portafolios/jamedia/jamedia-python/jamedia-python.component';
import { JamediaValaComponent } from './views/portafolios/jamedia/jamedia-vala/jamedia-vala.component';
import { JamediaRadioComponent } from './views/portafolios/jamedia/jamedia-radio/jamedia-radio.component';
import { GuiasComponent } from './views/guias/guias.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FilesService } from './servicios/files.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CurriculumComponent,
    PortafoliosComponent,
    JamediaComponent,
    NotfoundComponent,
    JamediaPythonComponent,
    JamediaValaComponent,
    JamediaRadioComponent,
    GuiasComponent,
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    AppRoutingModule,
    BrowserAnimationsModule, // https://coursetro.com/posts/code/63/Angular-4-Animation-Tutorial

    // https://angularfirebase.com/lessons/firebase-storage-with-angularfire-dropzone-file-uploader/
    // https://github.com/angular/angularfire2/blob/master/docs/storage/storage.md
    AngularFireModule.initializeApp(environment.firebaseconf),
    AngularFireStorageModule,
    AngularFirestoreModule, // https://angularfirebase.com/lessons/firestore-with-angularfire-basics/

    PdfViewerModule
  ],
  providers: [FilesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
