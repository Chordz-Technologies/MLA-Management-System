import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/shared/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'name', 'address', 'contact_no', 'email_id', 'problems', 'date', 'completion_date', 'contact_now'];

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getAllVisitors();
  }

  getAllVisitors() {
    this.service.getAllVisitors().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res.all_visitors);
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
