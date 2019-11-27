import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginShelterEmpComponent } from './login-shelter-emp.component';

describe('LoginShelterEmpComponent', () => {
  let component: LoginShelterEmpComponent;
  let fixture: ComponentFixture<LoginShelterEmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginShelterEmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginShelterEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
