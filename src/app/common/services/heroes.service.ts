import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../models/hero';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:3000';

/**
 * This class exposes all streams for fetching, filtering, creating, updating and deleting { Hero } items.
 * @class {HeroesService}
 */
@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private model = 'heroes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.getUrl());
  }

  getById(id: number): Observable<Hero> {
    return this.http.get<Hero>(this.getUrlWithId(id));
  }

  getByFilteredName(name: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.getUrlWithName(name));
  }

  create(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.getUrl(), hero);
  }

  update(hero: Hero): Observable<Hero> {
    const id = hero.id ?? -1;
    return this.http.put<Hero>(this.getUrlWithId(id), hero);
  }

  delete(id: number): Observable<Hero> {
    return this.http.delete<Hero>(this.getUrlWithId(id));
  }

  private getUrl() {
    return `${BASE_URL}/${this.model}`;
  }

  private getUrlWithId(id: number) {
    return `${this.getUrl()}/${id}`;
  }

  private getUrlWithName(name: string) {
    return `${this.getUrl()}?name_like=${name}`;
  }
}
