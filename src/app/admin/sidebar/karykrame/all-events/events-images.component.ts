import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/shared/service.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-events-images',
  templateUrl: './events-images.component.html',
  styleUrls: ['./events-images.component.scss']
})
export class EventsImagesComponent implements OnInit {
  public dataLoaded: boolean = false;
  displayedColumns: string[] = ['kid', 'kdate', 'ktime', 'name', 'contactno', 'klocation', 'subject', 'kphotos', 'comments'];
  dataSource!: MatTableDataSource<any>;

  constructor(private service: ServiceService, private toastr: ToastrService, private datePipe: DatePipe) { }

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

  filterByDate(selectedDate: Date) {
    const formattedDate = this.datePipe.transform(selectedDate, 'yyyy-MM-dd') || '';

    this.service.getEventsByDate(formattedDate).subscribe({
      next: (res: any) => {
        if (res.filtered_event && res.filtered_event.length > 0) {
          this.dataSource = new MatTableDataSource(res.filtered_event);
        } else {
          this.dataSource = new MatTableDataSource(res.filtered_event);
          this.toastr.error('No data found for the selected date.', 'Error');
        }
      },
      error: (err: any) => {
        console.log(err);
        this.toastr.error('An error occurred while fetching data.', 'Error');
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
