import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/shared/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications-page',
  templateUrl: './notifications-page.component.html',
  styleUrls: ['./notifications-page.component.scss']
})
export class NotificationsPageComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'name', 'contact_no', 'address', 'problems', 'otherProblems', 'date', 'completion_date', 'remaining_days'];

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getAllVisitors();
  }

  getAllVisitors() {
    this.service.getNotifications().subscribe({
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
