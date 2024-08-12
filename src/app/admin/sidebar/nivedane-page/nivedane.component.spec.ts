import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NivedaneComponent } from './nivedane.component';

describe('NivedaneComponent', () => {
  let component: NivedaneComponent;
  let fixture: ComponentFixture<NivedaneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NivedaneComponent]
    });
    fixture = TestBed.createComponent(NivedaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
