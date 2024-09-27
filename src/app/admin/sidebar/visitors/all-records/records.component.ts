import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/shared/service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'name', 'address', 'contact_no', 'email_id', 'problems', 'date', 'completion_date', 'status', 'comment', 'arja', 'contact_now', 'action'];

  constructor(private service: ServiceService, private router: Router, private toastr: ToastrService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getAllVisitors();

    const state = history.state;
    if (state && state.newVisitor) {
      this.addNewVisitor(state.newVisitor);
    }
  }

  addNewVisitor(newVisitor: any) {
    if (!this.dataSource) {
      this.dataSource = new MatTableDataSource([newVisitor]);
    } else {
      this.dataSource.data = [...this.dataSource.data, newVisitor];
    }
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

  filterByDate(selectedDate: Date) {
    const formattedDate = this.datePipe.transform(selectedDate, 'yyyy-MM-dd') || '';

    this.service.getVisitorsByDate(formattedDate).subscribe({
      next: (res: any) => {
        if (res.filtered_visitor && res.filtered_visitor.length > 0) {
          this.dataSource = new MatTableDataSource(res.filtered_visitor);
        } else {
          this.dataSource = new MatTableDataSource(res.filtered_visitor);
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

  edit(id: number) {
    this.router.navigate(['/edit-records', id]);
  }
}
