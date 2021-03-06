import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { UserperfilComponent } from './views/userperfil/userperfil.component';
import { CurriculumComponent } from './views/curriculum/curriculum.component';
import { PortafoliosComponent } from './views/portafolios/portafolios.component';
import { JamediaComponent } from './views/portafolios/jamedia/jamedia.component';
import { NotfoundComponent } from './views/notfound/notfound.component';
import { JamediaPythonComponent } from './views/portafolios/jamedia/jamedia-python/jamedia-python.component';
import { JamediaValaComponent } from './views/portafolios/jamedia/jamedia-vala/jamedia-vala.component';
import { JamediaRadioComponent } from './views/portafolios/jamedia/jamedia-radio/jamedia-radio.component';
import { GuiasComponent } from './views/guias/guias.component';
import { VideocursosComponent } from './views/videocursos/videocursos.component';
import { AuthGuard } from './guardianes/auth.guard';
import { LectorsGuard } from './guardianes/lectors.guard';
import { MenuarticulosComponent } from './views/menuarticulos/menuarticulos.component';
import { PandemiaComponent } from './views/pandemia/pandemia.component';


const routes: Routes = [
  // https://www.youtube.com/watch?v=pcOaAU_iaD4&index=3&list=PL6n9fhu94yhXwcl3a6rIfAI7QmGYIkfK5
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // component: HomeComponent
  { path: 'home', component: HomeComponent },
  { path: 'perfil', component: UserperfilComponent, canActivate: [AuthGuard] },
  { path: 'curriculum', component: CurriculumComponent },
  { path: 'portafolios', component: PortafoliosComponent },
  { path: 'jamedia', component: JamediaComponent },
  { path: 'jamedia_python', component: JamediaPythonComponent },
  { path: 'jamedia_vala', component: JamediaValaComponent },
  { path: 'jamedia_radio', component: JamediaRadioComponent },
  { path: 'guias', component: GuiasComponent, canActivate: [LectorsGuard] },
  { path: 'videocursos', component: VideocursosComponent, canActivate: [LectorsGuard] },
  { path: 'menuarticulos', component: MenuarticulosComponent},
  { path: 'pandemia', component: PandemiaComponent},
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
