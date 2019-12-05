import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerViewAnimalComponent } from './trainer-view-animal.component';

describe('TrainerViewAnimalComponent', () => {
  let component: TrainerViewAnimalComponent;
  let fixture: ComponentFixture<TrainerViewAnimalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerViewAnimalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerViewAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
