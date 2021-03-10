import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import isString from 'lodash-es/isString';
import orderBy from 'lodash-es/orderBy';
import { Observable } from 'rxjs';

import { OnDestroyComponent } from './on-destroy.component';

@Component({
  selector: 'app-table',
  template: '',
})

export abstract class TableComponent<T> extends OnDestroyComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false })
  sort!: MatSort;
  items!: Array<T>;
  pageSize = 25;
  pageSizeOptions = [10, 25, 50, 100];
  dataSource!: MatTableDataSource<T>;

  abstract displayedColumns: Array<string>;

  ngOnInit(): void {
    this.searchData();
  }

  searchData(): void {
    if (this.subscriptions.data) {
      this.subscriptions.data.unsubscribe();
    }

    this.subscriptions.data = this.loadItems()
      .subscribe(data => {
        this.items = data;

        if (this.dataSource) {
          this.dataSource.data = data;
        } else {
          this.dataSource = new MatTableDataSource<T>(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.dataSource.sortData = this.sortData;
        }
      });
  }

  filterData(filter: string): void {
    this.dataSource.filter = filter.trim()
      .toLocaleLowerCase();
  }

  protected sortData(data: Array<T>, sort: MatSort): Array<T> {
    if (sort.active && sort.direction) {
      return orderBy(
        data,
        [(item: { [x: string]: any; }) => isString(item[sort.active]) ? item[sort.active].toLocaleLowerCase() : item[sort.active]],
        sort.direction
      );
    }

    return data;
  }

  protected abstract loadItems(): Observable<Array<T>>;
}
