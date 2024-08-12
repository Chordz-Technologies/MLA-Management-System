import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/shared/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-superadmin',
  templateUrl: './superadmin.component.html',
  styleUrls: ['./superadmin.component.scss']
})
export class SuperAdminComponent {
  public dataLoaded: boolean = false;
  displayedColumns: string[] = ['said', 'saname', 'contactno', 'samessage', 'action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  superAdmin: any;

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getAllSuperList();
  }

  getAllSuperList() {
    this.service.getAllSuperAdminDetails().subscribe({
      next: (res: any) => {
        this.dataLoaded = true;
        this.superAdmin = res.all_admins.filter((admin: any) => admin.a_typesuperadmin !== 1 && admin.a_typesupersuperadmin !== 1);
        this.dataSource = new MatTableDataSource(this.superAdmin);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
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
    this.router.navigate(['/edit_superadmin_text', id]);
  }

  showRecords(id: number) {
    this.router.navigate(['/allRecords', id]);
  }
}
