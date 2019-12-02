import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelterViewAnimalsComponent } from './shelter-view-animals.component';

describe('ShelterViewAnimalsComponent', () => {
  let component: ShelterViewAnimalsComponent;
  let fixture: ComponentFixture<ShelterViewAnimalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShelterViewAnimalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelterViewAnimalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
