import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VetScheduleComponent } from './vet-schedule.component';

describe('VetScheduleComponent', () => {
  let component: VetScheduleComponent;
  let fixture: ComponentFixture<VetScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VetScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VetScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
