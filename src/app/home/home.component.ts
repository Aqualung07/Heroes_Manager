import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Hero } from '../common/models/hero';
import { HeroesService } from '../common/services/heroes.service';
import { LoadingService } from '../common/services/loading.service';

/**
 * This class is made to have a first glance to all stored Heroes.
 * @class {HomeComponent}
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private heroesService: HeroesService,
    private loadingService: LoadingService
  ) {}

  heroes$: Observable<Hero[]> | null = null;
  loading$: BehaviorSubject<boolean> | null = null;

  ngOnInit() {
    this.heroes$ = this.heroesService.getAll();
    this.loading$ = this.loadingService.loadingSub;
  }
}
