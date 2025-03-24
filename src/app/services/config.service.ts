import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: any;

  constructor(private http: HttpClient) { }

  loadConfig(): Promise<void> {
    const hostname = window.location.hostname.split('.')[0]; // Extract subdomain
    return this.http
      .get(`assets/config/project-config.json`)
      .toPromise()
      .then((data: any) => {
        this.config = data[hostname] || data['mlamedhakulkarni'];
      });
  }

  getConfig(): any {
    return this.config;
  }
}
