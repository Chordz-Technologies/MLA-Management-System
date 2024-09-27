import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-events-images',
  templateUrl: './events-images.component.html',
  styleUrls: ['./events-images.component.scss']
})
export class EventsImagesComponent implements OnInit {
  public dataLoaded: boolean = false;
  displayedColumns: string[] = ['kid', 'kdate', 'ktime', 'klocation', 'kphotos', 'comments'];
  dataSource!: MatTableDataSource<any>;

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.allKarykramData();

    const state = history.state;
    if (state && state.newEventsData) {
      this.newEventsData(state.newEventsData);
    }
  }

  newEventsData(newEventsData: any) {
    if (!this.dataSource) {
      this.dataSource = new MatTableDataSource([newEventsData]);
    } else {
      this.dataSource.data = [...this.dataSource.data, newEventsData];
    }
  }

  allKarykramData() {
    this.service.getAllKarykramImages().subscribe({
      next: (res: any) => {
        this.dataLoaded = true;
        this.dataSource = new MatTableDataSource(res.all_karyakram);
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
