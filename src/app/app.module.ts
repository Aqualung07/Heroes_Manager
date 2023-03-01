import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroesListComponent } from './heroes/heroes-list/heroes-list.component';
import { HeroDetailComponent } from './heroes/hero-detail/hero-detail.component';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { DeleteModalComponent } from './common/components/delete-modal/delete-modal.component';
import { httpInterceptorProviders } from './common/interceptors/http-interceptor-provider';
import { UpperCaseDirective } from './common/directives/upper-case.directive';
import { HeroViewComponent } from './heroes/hero-view/hero-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroesListComponent,
    HeroDetailComponent,
    HeroViewComponent,
    HomeComponent,
    DeleteModalComponent,
    UpperCaseDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
