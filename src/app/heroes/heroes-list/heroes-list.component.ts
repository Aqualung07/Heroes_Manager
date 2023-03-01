import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Hero } from 'src/app/common/models/hero';

/**
 * This class is to show the list of stored Hero items on a table view. It receives an
 * array of Hero data, and emits values for select, filter and delete values.
 * @Input { heroes } Array of Hero items.
 * @Input { loading } Boolean value to determine if any request is being performed.
 * @Output { selected } Emits selected Hero item.
 * @Output { deleted } Emits Hero item to delete.
 * @Output { filter } Emits value to filter Hero item by name.
 * @class {HeroesListComponent}
 */
@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss'],
})
export class HeroesListComponent implements AfterViewInit {
  @Input() set heroes(values: Hero[] | null) {
    if (!values) return;
    this.dataSource.data = values;
  }
  @Input() loading: boolean | null = false;
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
  @Output() filter = new EventEmitter();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('heroesTableSort') sort: MatSort = new MatSort();

  dataSource = new MatTableDataSource<Hero>();
  columns = ['name', 'description', 'powerLevel', 'favorite', 'actions'];

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
