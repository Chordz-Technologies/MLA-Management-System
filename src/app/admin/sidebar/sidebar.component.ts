import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  sidebarTitle = '';
  sidebarImage = '';
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  Admin: boolean = localStorage.getItem('adminType') === 'Admin';
  SuperAdmin: boolean = localStorage.getItem('adminType') === 'Superadmin';

  constructor(private router: Router, private configService: ConfigService) { }

  ngOnInit(): void {
    const config = this.configService.getConfig();
    this.sidebarTitle = config.sidebarTitle;
    this.sidebarImage = config.sidebarImage;
  }
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
