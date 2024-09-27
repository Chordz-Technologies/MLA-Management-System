import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-nivedane-images',
  templateUrl: './nivedane-images.component.html',
  styleUrls: ['./nivedane-images.component.scss']
})
export class NivedaneImagesComponent implements OnInit {

  public dataLoaded: boolean = false;
  displayedColumns: string[] = ['id', 'n_label', 'date', 'photos'];
  dataSource!: MatTableDataSource<any>;

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.allNivedaneData();

    const state = history.state;
    if (state && state.newyojanaData) {
      this.newYojanaData(state.newyojanaData);
    }
  }

  newYojanaData(newyojanaData: any) {
    if (!this.dataSource) {
      this.dataSource = new MatTableDataSource([newyojanaData]);
    } else {
      this.dataSource.data = [...this.dataSource.data, newyojanaData];
    }
  }

  allNivedaneData() {
    this.service.getAllNivedaneImages().subscribe({
      next: (res: any) => {
        this.dataLoaded = true;
        this.dataSource = new MatTableDataSource(res.all_nivedan);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onChange(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}