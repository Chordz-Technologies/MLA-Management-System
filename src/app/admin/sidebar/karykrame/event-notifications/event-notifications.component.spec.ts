import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventNotificationsComponent } from './event-notifications.component';

describe('EventNotificationsComponent', () => {
  let component: EventNotificationsComponent;
  let fixture: ComponentFixture<EventNotificationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventNotificationsComponent]
    });
    fixture = TestBed.createComponent(EventNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
