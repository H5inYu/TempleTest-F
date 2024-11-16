import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonaterecordComponent } from './donaterecord.component';

describe('DonaterecordComponent', () => {
  let component: DonaterecordComponent;
  let fixture: ComponentFixture<DonaterecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonaterecordComponent]
    });
    fixture = TestBed.createComponent(DonaterecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
