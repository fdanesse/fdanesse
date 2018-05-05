import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { CurriculumComponent } from './views/curriculum/curriculum.component';
import { PortafoliosComponent } from './views/portafolios/portafolios.component';
import { JamediaComponent } from './views/portafolios/jamedia/jamedia.component';
import { NotfoundComponent } from './views/notfound/notfound.component';
import {JamediaPythonComponent} from './views/portafolios/jamedia/jamedia-python/jamedia-python.component';


const routes: Routes = [
  // https://www.youtube.com/watch?v=pcOaAU_iaD4&index=3&list=PL6n9fhu94yhXwcl3a6rIfAI7QmGYIkfK5
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // component: HomeComponent
  { path: 'home', component: HomeComponent },
  { path: 'curriculum', component: CurriculumComponent },
  { path: 'portafolios', component: PortafoliosComponent },
  { path: 'jamedia', component: JamediaComponent },
  { path: 'jamedia_python', component: JamediaPythonComponent },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
