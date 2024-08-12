import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoggedIn: BehaviorSubject<boolean>;

  constructor() {
    const storedLoggedInStatus = localStorage.getItem('isLoggedIn');
    const initialLoggedInStatus = storedLoggedInStatus ? JSON.parse(storedLoggedInStatus) : false;
    this.isLoggedIn = new BehaviorSubject<boolean>(initialLoggedInStatus);
  }

  getAdminType(): string {
    return localStorage.getItem('adminType') || '';
  }

  login(adminType: string, adminId: string) {
    localStorage.setItem('adminType', adminType); 
    localStorage.setItem('adminId', adminId);
    this.isLoggedIn.next(true);
  }

  isLoggedIn2() {
    return !!localStorage.getItem('adminType');
  }

  logout() {
    localStorage.removeItem('adminType');
    localStorage.removeItem('adminId');
    this.isLoggedIn.next(false);
  }
}
