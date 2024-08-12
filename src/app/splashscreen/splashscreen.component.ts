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
        this.router.navigate(['/dashboard']);
      } else if (userType === 'Superadmin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/dashboard']); // Default route
      }
    }, 3000); // Adjust the delay time (3000ms = 3 seconds) as needed
  }
}
