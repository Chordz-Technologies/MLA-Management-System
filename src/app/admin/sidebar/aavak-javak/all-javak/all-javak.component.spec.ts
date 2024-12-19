import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllJavakComponent } from './all-javak.component';

describe('AllJavakComponent', () => {
  let component: AllJavakComponent;
  let fixture: ComponentFixture<AllJavakComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllJavakComponent]
    });
    fixture = TestBed.createComponent(AllJavakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
