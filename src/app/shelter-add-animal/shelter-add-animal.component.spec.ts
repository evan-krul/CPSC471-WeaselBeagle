import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelterAddAnimalComponent } from './shelter-add-animal.component';

describe('ShelterAddAnimalComponent', () => {
  let component: ShelterAddAnimalComponent;
  let fixture: ComponentFixture<ShelterAddAnimalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShelterAddAnimalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelterAddAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
