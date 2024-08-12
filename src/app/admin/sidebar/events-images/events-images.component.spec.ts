import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsImagesComponent } from './events-images.component';

describe('EventsImagesComponent', () => {
  let component: EventsImagesComponent;
  let fixture: ComponentFixture<EventsImagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventsImagesComponent]
    });
    fixture = TestBed.createComponent(EventsImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
