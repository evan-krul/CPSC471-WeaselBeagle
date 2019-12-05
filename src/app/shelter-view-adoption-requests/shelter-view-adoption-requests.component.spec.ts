import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelterViewAdoptionRequestsComponent } from './shelter-view-adoption-requests.component';

describe('ShelterViewAdoptionRequestsComponent', () => {
  let component: ShelterViewAdoptionRequestsComponent;
  let fixture: ComponentFixture<ShelterViewAdoptionRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShelterViewAdoptionRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelterViewAdoptionRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
