import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
})
export class CarsComponent implements OnInit {
  filteredDataSource: any[] = [];
  sortOrder: string;
  constructor(
    public dialogRef: MatDialogRef<CarsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource: any[] = [];
  name: string;

  displayedColumns = ['id', 'make', 'model', 'numberplate'];

  ngOnInit(): void {
    if (this.data?.dataSource && Array.isArray(this.data.dataSource)) {
      this.dataSource = this.data.dataSource as any[];
      this.filteredDataSource = [...this.data?.dataSource];
    }
    this.name = this.data?.name;
  }

  sortChange(event: any) {
    this.sortOrder = event.direction;
    if (this.sortOrder) {
      this.sortFunc();
    }
  }

  sortFunc() {
    if (this.sortOrder === 'desc') {
      this.filteredDataSource = [
        ...this.filteredDataSource.sort((a, b) => b.make.localeCompare(a.make)),
      ];
    } else if (this.sortOrder === 'asc') {
      this.filteredDataSource = [
        ...this.filteredDataSource.sort((a, b) => a.make.localeCompare(b.make)),
      ];
    }
  }

  searchCars(event: any) {
    let str = event.target.value as string;
    if (str && str.trim() !== '') {
      str = str.toLowerCase();
      this.filteredDataSource = this.dataSource.filter(
        (x) =>
          x.make?.toLowerCase().includes(str) ||
          x.model?.toLowerCase().includes(str) ||
          x.numberplate?.toLowerCase().includes(str)
      );
      this.sortFunc();
    } else {
      this.filteredDataSource = [...this.dataSource];
    }
  }
}
