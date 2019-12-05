import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAdoptedComponent } from './view-adopted.component';

describe('ViewAdoptedComponent', () => {
  let component: ViewAdoptedComponent;
  let fixture: ComponentFixture<ViewAdoptedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAdoptedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAdoptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
