import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VetAddHealthRecordComponent } from './vet-add-health-record.component';

describe('VetAddHealthRecordComponent', () => {
  let component: VetAddHealthRecordComponent;
  let fixture: ComponentFixture<VetAddHealthRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VetAddHealthRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VetAddHealthRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
