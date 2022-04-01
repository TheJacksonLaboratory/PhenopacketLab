import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Disease } from 'src/app/models/disease';

@Component({
  selector: 'app-disease',
  templateUrl: './disease.component.html',
  styleUrls: ['./disease.component.scss']
})
export class DiseaseComponent implements OnInit {

  //Table items
  displayedColumns = ['id', 'name', 'status', 'onset', 'resolution', 'metadata', 'remove'];

  // MatPaginator Inputs
  pageLength = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 50, 100];

  diseaseDatasource = new MatTableDataSource<Disease>();

  constructor() { }

  ngOnInit(): void {
  }

  addDisease() {

  }
  removeDisease() {

  }
  doPageChange(pageEvent: any) {

  }
}
