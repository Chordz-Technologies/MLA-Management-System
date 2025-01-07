import { Component, OnInit } from '@angular/core';
import { ConfigService } from './services/config.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = '';

  constructor(private titleService: Title, private configService: ConfigService) { }

  ngOnInit(): void {
    const config = this.configService.getConfig();
    this.titleService.setTitle(config.title); // Set the dynamic title
  }
}