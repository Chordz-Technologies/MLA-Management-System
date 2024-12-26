import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'contactno', 'action'];
  dataSource!: MatTableDataSource<any>;

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.allContactData();

    const state = history.state;
    if (state && state.newContactData) {
      this.newContactData(state.newContactData);
    }
  }

  newContactData(newContactData: any) {
    if (!this.dataSource) {
      this.dataSource = new MatTableDataSource([newContactData]);
    } else {
      this.dataSource.data = [...this.dataSource.data, newContactData];
    }
  }

  allContactData() {
    this.service.getAllContactData().subscribe({
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

  onChange(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  edit(id: number) {
    this.router.navigate(['/edit-contacts', id]);
  }
}