import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserForgotpasswordComponent } from './user-forgotpassword.component';

describe('UserForgotpasswordComponent', () => {
  let component: UserForgotpasswordComponent;
  let fixture: ComponentFixture<UserForgotpasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserForgotpasswordComponent]
    });
    fixture = TestBed.createComponent(UserForgotpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
