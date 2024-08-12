import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public dataLoaded: boolean = false;
  displayedColumns: string[] = ['aid', 'aname', 'acontactno', 'amessage'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  superAdmin: any;
  input: any;

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    // Check if the admin type is "Admin" in local storage
    const adminType = localStorage.getItem('adminType');
    if (adminType === 'Admin') {
      // Call the method to fetch super admin details based on the admin type
      this.getSuperAdminDetailsBasedOnLocalStorage();
    }
  }

  getSuperAdminDetailsBasedOnLocalStorage() {
    // Get admin type and ID from local storage
    const adminType = localStorage.getItem('adminType');
    const adminId = localStorage.getItem('adminId');

    // If admin type and ID exist in local storage
    if (adminType && adminId) {
      // Call the API to fetch super admin details
      this.service.getAllSuperAdminDetails().subscribe({
        next: (res: any) => {
          // Filter the super admin data based on the admin type and ID from local storage
          this.superAdmin = res.all_admins.filter((admin: any) => admin.a_typeadmin == 1 && admin.a_id == adminId);
          this.dataLoaded = true;
          this.dataSource = new MatTableDataSource(this.superAdmin);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error: (err: any) => {
          console.log(err);
        }
      });
    } else {
      // Handle case where admin type or ID is missing from local storage
      console.log('Admin type or ID missing from local storage');
    }
  }

  edit(id: number) {
    this.router.navigate(['/edit_admin_text', id]);
  }

  showRecords(id: number) {
    this.router.navigate(['/adminFiles', id]);
  }
}
