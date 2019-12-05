import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VetViewAnimalsComponent } from './vet-view-animals.component';

describe('VetViewAnimalsComponent', () => {
  let component: VetViewAnimalsComponent;
  let fixture: ComponentFixture<VetViewAnimalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VetViewAnimalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VetViewAnimalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
