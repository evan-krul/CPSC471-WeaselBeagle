import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerViewAnimalsComponent } from './trainer-view-animals.component';

describe('TrainerViewAnimalsComponent', () => {
  let component: TrainerViewAnimalsComponent;
  let fixture: ComponentFixture<TrainerViewAnimalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerViewAnimalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerViewAnimalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
