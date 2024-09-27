import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NivedaneImagesComponent } from './nivedane-images.component';

describe('NivedaneImagesComponent', () => {
  let component: NivedaneImagesComponent;
  let fixture: ComponentFixture<NivedaneImagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NivedaneImagesComponent]
    });
    fixture = TestBed.createComponent(NivedaneImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
