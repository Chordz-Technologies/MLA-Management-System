import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AavakPageComponent } from './aavak-page.component';

describe('AavakJavakPageComponent', () => {
  let component: AavakPageComponent;
  let fixture: ComponentFixture<AavakPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AavakPageComponent]
    });
    fixture = TestBed.createComponent(AavakPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
