import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hero } from 'src/app/common/models/hero';

/**
 * This class receives Hero data via Injection (MAT_DIALOG_DATA injector),
 * populates form fields and returns form value when the Modal gets closed.
 * @class {HeroViewComponent}
 */
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent implements OnInit {
  MAX_DESCRIPTION_CHARS = 200;
  selectedHero: Hero;
  heroForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [
      Validators.pattern(/^[a-zA-Z\s]*$/),
      Validators.required,
    ]),
    description: new FormControl('', [
      Validators.maxLength(this.MAX_DESCRIPTION_CHARS),
      Validators.pattern(/^[\w\d\s\.\,\-]*$/),
      Validators.required,
    ]),
    powerLevel: new FormControl(''),
    favorite: new FormControl(''),
  });

  constructor(@Inject(MAT_DIALOG_DATA) data: Hero) {
    this.selectedHero = data;
  }

  ngOnInit() {
    this.heroForm.patchValue(this.selectedHero);
  }
}
