import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAavakComponent } from './all-aavak.component';

describe('AavakJavakImagesComponent', () => {
  let component: AllAavakComponent;
  let fixture: ComponentFixture<AllAavakComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllAavakComponent]
    });
    fixture = TestBed.createComponent(AllAavakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
