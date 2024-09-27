import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRecordsComponent } from './edit-records.component';

describe('EditRecordsComponent', () => {
  let component: EditRecordsComponent;
  let fixture: ComponentFixture<EditRecordsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditRecordsComponent]
    });
    fixture = TestBed.createComponent(EditRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
