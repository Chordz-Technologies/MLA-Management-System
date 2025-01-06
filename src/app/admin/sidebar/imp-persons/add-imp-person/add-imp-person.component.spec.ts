import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImpPersonComponent } from './add-imp-person.component';

describe('AddImpPersonComponent', () => {
  let component: AddImpPersonComponent;
  let fixture: ComponentFixture<AddImpPersonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddImpPersonComponent]
    });
    fixture = TestBed.createComponent(AddImpPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
