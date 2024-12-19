import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJavakComponent } from './add-javak.component';

describe('AddJavakComponent', () => {
  let component: AddJavakComponent;
  let fixture: ComponentFixture<AddJavakComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddJavakComponent]
    });
    fixture = TestBed.createComponent(AddJavakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
