import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroViewComponent } from './heroes/hero-view/hero-view.component';

import { HeroesComponent } from './heroes/heroes.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'hero/:id', component: HeroViewComponent },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
