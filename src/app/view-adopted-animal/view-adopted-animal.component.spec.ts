import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAdoptedAnimalComponent } from './view-adopted-animal.component';

describe('ViewAdoptedAnimalComponent', () => {
  let component: ViewAdoptedAnimalComponent;
  let fixture: ComponentFixture<ViewAdoptedAnimalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAdoptedAnimalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAdoptedAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
