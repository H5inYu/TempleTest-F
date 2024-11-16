import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActOkpayComponent } from './act-okpay.component';

describe('ActOkpayComponent', () => {
  let component: ActOkpayComponent;
  let fixture: ComponentFixture<ActOkpayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActOkpayComponent]
    });
    fixture = TestBed.createComponent(ActOkpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
