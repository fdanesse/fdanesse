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


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CurriculumComponent,
    PortafoliosComponent,
    JamediaComponent,
    NotfoundComponent,
    JamediaPythonComponent,
    JamediaValaComponent
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    AppRoutingModule,
    BrowserAnimationsModule // https://coursetro.com/posts/code/63/Angular-4-Animation-Tutorial
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
