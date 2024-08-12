import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KatranImagesComponent } from './katran-images.component';

describe('KatranImagesComponent', () => {
  let component: KatranImagesComponent;
  let fixture: ComponentFixture<KatranImagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KatranImagesComponent]
    });
    fixture = TestBed.createComponent(KatranImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
