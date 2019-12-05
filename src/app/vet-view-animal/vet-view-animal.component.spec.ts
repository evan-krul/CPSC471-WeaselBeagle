import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VetViewAnimalComponent } from './vet-view-animal.component';

describe('VetViewAnimalComponent', () => {
  let component: VetViewAnimalComponent;
  let fixture: ComponentFixture<VetViewAnimalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VetViewAnimalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VetViewAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
