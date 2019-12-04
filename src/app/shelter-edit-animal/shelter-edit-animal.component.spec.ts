import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelterEditAnimalComponent } from './shelter-edit-animal.component';

describe('ShelterEditAnimalComponent', () => {
  let component: ShelterEditAnimalComponent;
  let fixture: ComponentFixture<ShelterEditAnimalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShelterEditAnimalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelterEditAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
