import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/internal/Observable';
import { AppModule } from '../app.module';
import { Hero } from '../common/models/hero';

import { HeroesComponent } from './heroes.component';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  const sampleHero: Hero = {
    id: 999,
    name: 'Sample Name',
    description: 'Sample Description',
    powerLevel: 100,
    favorite: true,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should render 'heroes-list' component`, () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-heroes-list')).toBeTruthy();
  });

  it('should listen to loading stream', () => {
    expect(fixture.componentInstance.loading$).toBeTruthy();
  });

  it('should listen to heroes stream', () => {
    expect(fixture.componentInstance.heroes$).toBeTruthy();
  });

  it('should be able to subscribe to heroes fetch', () => {
    expect(fixture.componentInstance.heroes$).toBeInstanceOf(
      Observable<Hero[]>
    );
  });

  it('should be able to select a hero', () => {
    expect(fixture.componentInstance.selectHero).toBeDefined();
  });

  it('should be able to select an existing hero item', () => {
    expect(
      fixture.componentInstance.selectHero(sampleHero, true) == sampleHero.id
    ).toBeTruthy();
  });

  it('should be able to select a new hero item', () => {
    const newHero: Hero = {
      id: -1,
      name: '',
      description: '',
      powerLevel: 0,
      favorite: false,
    };
    expect(
      fixture.componentInstance.selectHero(newHero, true) == newHero.id
    ).toBeTruthy();
  });

  it('should fire delete confirmation modal', () => {
    expect(fixture.componentInstance.openDeleteConfirmationModal).toBeDefined();
    expect(
      fixture.componentInstance.openDeleteConfirmationModal()
    ).toBeTruthy();
  });

  it('should be able to subscribe to hero filter', () => {
    expect(fixture.componentInstance.filter).toBeDefined();
    fixture.componentInstance.filter('man');
    expect(fixture.componentInstance.heroes$).toBeInstanceOf(
      Observable<Hero[]>
    );
  });
});
