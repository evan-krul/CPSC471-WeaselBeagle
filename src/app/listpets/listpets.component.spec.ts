import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpetsComponent } from './listpets.component';

describe('ListpetsComponent', () => {
  let component: ListpetsComponent;
  let fixture: ComponentFixture<ListpetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListpetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListpetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
