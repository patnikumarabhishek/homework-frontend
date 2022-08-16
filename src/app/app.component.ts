import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { CarsComponent } from './components/cars/cars.component';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'mvp-user-cars';

  displayedColumns = ['id', 'name', 'actions'];
  dataSource: any[];
  sortOrder = '';

  constructor(
    private dialogService: MatDialog,
    private dataService: DataService
  ) {}

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  ngOnInit() {
    this.loadData();
  }

  view(obj: any) {
    const dialogRef = this.dialogService.open(CarsComponent, {
      data: { dataSource: obj.cars, name: obj.name, id: obj.id },
    });

    dialogRef.afterClosed().subscribe(() => {});
  }

  sortChange(event: any) {
    this.sortOrder = event.direction
      ? event.column + ':' + event.direction
      : '';
    this.loadData();
  }

  searchUsers(event: any) {
    this.loadData(event.target.value);
  }

  public loadData(searchStr = '') {
    this.dataService.getUsers(searchStr, this.sortOrder).subscribe(
      (response) => {
        this.dataSource = response as any[];
      },
      (error) => {
        this.dataSource = [];
        console.log(error);
      }
    );
  }
}
