import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExistingRecordComponent } from './add-existing-record.component';

describe('AddExistingRecordComponent', () => {
  let component: AddExistingRecordComponent;
  let fixture: ComponentFixture<AddExistingRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddExistingRecordComponent]
    });
    fixture = TestBed.createComponent(AddExistingRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
