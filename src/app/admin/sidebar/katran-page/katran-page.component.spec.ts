import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KatranPageComponent } from './katran-page.component';

describe('KatranPageComponent', () => {
  let component: KatranPageComponent;
  let fixture: ComponentFixture<KatranPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KatranPageComponent]
    });
    fixture = TestBed.createComponent(KatranPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
