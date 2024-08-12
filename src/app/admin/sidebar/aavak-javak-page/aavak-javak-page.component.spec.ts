import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AavakJavakPageComponent } from './aavak-javak-page.component';

describe('AavakJavakPageComponent', () => {
  let component: AavakJavakPageComponent;
  let fixture: ComponentFixture<AavakJavakPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AavakJavakPageComponent]
    });
    fixture = TestBed.createComponent(AavakJavakPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
