import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdopterScheduleVetComponent } from './adopter-schedule-vet.component';

describe('AdopterScheduleVetComponent', () => {
  let component: AdopterScheduleVetComponent;
  let fixture: ComponentFixture<AdopterScheduleVetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdopterScheduleVetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdopterScheduleVetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
