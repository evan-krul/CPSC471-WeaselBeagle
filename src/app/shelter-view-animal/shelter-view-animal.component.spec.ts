import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelterViewAnimalComponent } from './shelter-view-animal.component';

describe('ShelterViewAnimalComponent', () => {
  let component: ShelterViewAnimalComponent;
  let fixture: ComponentFixture<ShelterViewAnimalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShelterViewAnimalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelterViewAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
