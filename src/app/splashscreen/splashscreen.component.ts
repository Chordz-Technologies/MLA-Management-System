import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splashscreen',
  templateUrl: './splashscreen.component.html',
  styleUrls: ['./splashscreen.component.scss']
})
export class SplashscreenComponent implements OnInit {
  showSplashScreen = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      const userType = localStorage.getItem('adminType');
      this.showSplashScreen = false; // Hide the splash screen
      if (userType === 'Admin') {
        this.router.navigate(['/admin-dashboard']);
      } else if (userType === 'Superadmin') {
        this.router.navigate(['/होम']);
      } else {
        this.router.navigate(['/admin-dashboard']); // Default route
      }
    }, 5000); // Adjust the delay time (5000ms = 5 seconds) as needed
  }
}
