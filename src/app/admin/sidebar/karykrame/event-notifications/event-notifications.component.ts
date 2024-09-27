import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/shared/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-notifications',
  templateUrl: './event-notifications.component.html',
  styleUrls: ['./event-notifications.component.scss']
})
export class EventNotificationsComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'date', 'time', 'location', 'photos', 'comments', 'remaining_days'];

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getAllEvents();
  }

  getAllEvents() {
    this.service.getEventNotifications().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res.data);
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
}
