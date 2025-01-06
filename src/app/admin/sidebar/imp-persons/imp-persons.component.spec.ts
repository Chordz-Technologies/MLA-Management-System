import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpPersonsComponent } from './imp-persons.component';

describe('ImpPersonsComponent', () => {
  let component: ImpPersonsComponent;
  let fixture: ComponentFixture<ImpPersonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImpPersonsComponent]
    });
    fixture = TestBed.createComponent(ImpPersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
