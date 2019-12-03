import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdopterViewAnimalsComponent } from './adopter-view-animals.component';

describe('AdopterViewAnimalsComponent', () => {
  let component: AdopterViewAnimalsComponent;
  let fixture: ComponentFixture<AdopterViewAnimalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdopterViewAnimalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdopterViewAnimalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
