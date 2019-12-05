import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdopterScheduleTrainerComponent } from './adopter-schedule-trainer.component';

describe('AdopterScheduleTrainerComponent', () => {
  let component: AdopterScheduleTrainerComponent;
  let fixture: ComponentFixture<AdopterScheduleTrainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdopterScheduleTrainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdopterScheduleTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
