import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdopterViewAnimalComponent } from './adopter-view-animal.component';

describe('AdopterViewAnimalComponent', () => {
  let component: AdopterViewAnimalComponent;
  let fixture: ComponentFixture<AdopterViewAnimalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdopterViewAnimalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdopterViewAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
