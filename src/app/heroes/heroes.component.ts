import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { DeleteModalComponent } from '../common/components/delete-modal/delete-modal.component';
import { Hero } from '../common/models/hero';
import { HeroesService } from '../common/services/heroes.service';
import { LoadingService } from '../common/services/loading.service';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

let selectedHero: Hero = {
  id: -1,
  name: '',
  description: '',
  powerLevel: 0,
  favorite: false,
};

/**
 * Contains CRUD logic, communication with HeroesService and displays HeroesList component.
 * @class {HeroesComponent}
 */
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  constructor(
    private heroesService: HeroesService,
    private dialog: MatDialog,
    private loadingService: LoadingService
  ) {}

  heroes$: Observable<Hero[]> | null = null;
  loading$: BehaviorSubject<boolean> | null = null;

  ngOnInit(): void {
    this.listenToLoading();
    this.fetchData();
  }

  /**
   * Dispatches Hero details form modal with populated data.
   * @param hero {Hero} - Provided data.
   * @param dry {boolean} - For testing purposes. Do not pass value to open modal.
   * @return {number} Returns selected hero id.
   */
  selectHero(hero: Hero, dry?: boolean): number | null {
    let currentHero = hero ?? selectedHero;
    if (!dry) this.handleDetailsModal(currentHero);
    return currentHero.id;
  }

  /**
   * Dispatches delete confirmation modal and handles deletion.
   * @param heroId {number} - Id of the hero to be deleted.
   */
  deleteHero(heroId: number) {
    const dialogRef = this.openDeleteConfirmationModal();
    dialogRef.afterClosed().subscribe((value) => {
      if (!value) return;
      this.heroesService.delete(heroId).subscribe((_) => this.fetchData());
    });
  }

  /**
   * Listen to the getByFilteredName() Observable in the HeroesService class.
   * @param heroName {string} - Value to be contained on Heroe's name.
   */
  filter(heroName: string) {
    this.heroes$ = this.heroesService.getByFilteredName(heroName);
  }

  /**
   * Returns deletion modal reference.
   * @return Deletion modal reference.
   */
  openDeleteConfirmationModal(): MatDialogRef<DeleteModalComponent, any> {
    return this.dialog.open(DeleteModalComponent);
  }

  /**
   * Returns detail modal reference.
   * @return Detail modal reference.
   */
  openHeroDetailModal(
    currentHero: Hero
  ): MatDialogRef<HeroDetailComponent, any> {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = currentHero;
    return this.dialog.open(HeroDetailComponent, dialogConfig);
  }

  /**
   * Dispatches Hero's detail modal and handles its result.
   * @param currentHero {Hero} - Provided Hero data.
   */
  private handleDetailsModal(currentHero: Hero) {
    const dialogRef = this.openHeroDetailModal(currentHero);
    dialogRef.afterClosed().subscribe((value: Hero) => {
      if (!value) return;
      let stream;
      value.name = value.name.toUpperCase();
      if (value.id !== -1) {
        stream = this.heroesService.update(value);
      } else {
        value.id = null;
        stream = this.heroesService.create(value);
      }
      stream.subscribe((_) => this.fetchData());
    });
  }

  /**
   * Listen to the getAll() Observable in the HeroesService class.
   */
  private fetchData() {
    this.heroes$ = this.heroesService.getAll();
  }

  /**
   * Listen to the loadingSub property in the LoadingService class.
   */
  listenToLoading(): void {
    this.loading$ = this.loadingService.loadingSub;
  }
}
