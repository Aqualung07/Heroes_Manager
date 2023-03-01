import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from 'src/app/common/models/hero';
import { HeroesService } from 'src/app/common/services/heroes.service';
import { LoadingService } from 'src/app/common/services/loading.service';

/**
 * This class reads a Hero id from the route params and displays it in a single card.
 * @class {HeroViewComponent}
 */
@Component({
  selector: 'app-hero-view',
  templateUrl: './hero-view.component.html',
  styleUrls: ['./hero-view.component.scss'],
})
export class HeroViewComponent implements OnInit {
  hero: Hero | null = null;
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroesService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.captureHeroIdFromRoute();
    this.listenToLoading();
  }

  /**
   * Captures Hero id from route params. Dispatches fetching hero by id.
   */
  private captureHeroIdFromRoute() {
    const id = this.route.snapshot.paramMap.get('id') ?? '-1';
    this.fetchHeroById(parseInt(id));
  }

  /**
   * Listen to the getById() Observable in the HeroesService class.
   * @param id {number} - Id for the hero to fetch.
   */
  private fetchHeroById(id: number) {
    this.heroService.getById(id).subscribe((hero) => {
      this.hero = hero;
    });
  }

  /**
   * Listen to the loadingSub property in the LoadingService class.
   */
  private listenToLoading() {
    this.loadingService.loadingSub.subscribe((loading) => {
      this.loading = loading;
    });
  }
}
