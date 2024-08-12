import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecordsComponent } from './add-records.component';

describe('AddRecordsComponent', () => {
  let component: AddRecordsComponent;
  let fixture: ComponentFixture<AddRecordsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRecordsComponent]
    });
    fixture = TestBed.createComponent(AddRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
