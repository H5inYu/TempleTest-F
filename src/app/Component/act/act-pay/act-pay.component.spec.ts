import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActPayComponent } from './act-pay.component';

describe('ActPayComponent', () => {
  let component: ActPayComponent;
  let fixture: ComponentFixture<ActPayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActPayComponent]
    });
    fixture = TestBed.createComponent(ActPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
