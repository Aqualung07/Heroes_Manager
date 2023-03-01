import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Heroes Manager';

  links = [
    { path: '/home', icon: 'home', title: 'Home' },
    { path: '/heroes', icon: 'view_list', title: 'Heroes' },
  ];
}
