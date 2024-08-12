import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  Admin: boolean = localStorage.getItem('adminType') === 'Admin';
  SuperAdmin: boolean = localStorage.getItem('adminType') === 'Superadmin';
  SuperSuperadmin: boolean = localStorage.getItem('adminType') === 'SuperSuperadmin';

  constructor(private router: Router) { }

  // Assume you have a method to handle login result
  handleLoginResult(result: any) {
    if (result.message === 'Valid User' && result.admin_type === 'Admin') {
      this.isLoggedIn = true;
      this.isAdmin = true;
    } else {
      this.isLoggedIn = false;
      this.isAdmin = false;
    }
  }

  logout() {
    localStorage.removeItem('adminType');
    this.router.navigate(['login']);
  }
}
