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
  visitorCount = 0;
  completeWorkCount = 0;
  incompleteWorkCount = 0;
  inProgressWorkCount = 0;

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getAllSuperList();
  }

  getAllSuperList() {
    this.service.getAllVisitors().subscribe((data: any) => {
      const visitors = data.all_visitors; // Assuming the API returns data in this format
      this.visitorCount = visitors.length; // Total visitors count

      // Calculating the counts based on the v_status field
      this.completeWorkCount = visitors.filter((visitor: any) => visitor.v_status === 'Work Complete').length;
      this.incompleteWorkCount = visitors.filter((visitor: any) => visitor.v_status === 'Work Incomplete').length;
      this.inProgressWorkCount = visitors.filter((visitor: any) => visitor.v_status === 'Work In Progress').length;
    });
  

    this.service.getAllSuperAdminDetails().subscribe({
      next: (res: any) => {
        this.dataLoaded = true;
        this.superAdmin = res.all_admins;
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
    this.router.navigate(['/edit_admin', id]);
  }
}
