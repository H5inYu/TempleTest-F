import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPersonelinfoComponent } from './user-personelinfo.component';

describe('UserPersonelinfoComponent', () => {
  let component: UserPersonelinfoComponent;
  let fixture: ComponentFixture<UserPersonelinfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserPersonelinfoComponent]
    });
    fixture = TestBed.createComponent(UserPersonelinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
