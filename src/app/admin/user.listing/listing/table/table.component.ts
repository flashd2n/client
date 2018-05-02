import { HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'table-listing',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  public displayedColumns = ['id', 'email', 'createdAt', 'applications'];

  @Input()
  public dataSource;
  @Input()
  public paginatedButtons: number;

  @ViewChild(MatPaginator) public paginator: MatPaginator;
  @ViewChild(MatSort) public sort: MatSort;

  constructor() { }

  public ngOnInit(): void { }
}
