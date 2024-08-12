import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AavakJavakImagesComponent } from './aavak-javak-images.component';

describe('AavakJavakImagesComponent', () => {
  let component: AavakJavakImagesComponent;
  let fixture: ComponentFixture<AavakJavakImagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AavakJavakImagesComponent]
    });
    fixture = TestBed.createComponent(AavakJavakImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
