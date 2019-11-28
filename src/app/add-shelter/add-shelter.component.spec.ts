import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShelterComponent } from './add-shelter.component';

describe('AddShelterComponent', () => {
  let component: AddShelterComponent;
  let fixture: ComponentFixture<AddShelterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddShelterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddShelterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
