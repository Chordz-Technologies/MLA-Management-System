import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatravyavharComponent } from './patravyavhar.component';

describe('PatravyavharComponent', () => {
  let component: PatravyavharComponent;
  let fixture: ComponentFixture<PatravyavharComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatravyavharComponent]
    });
    fixture = TestBed.createComponent(PatravyavharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
