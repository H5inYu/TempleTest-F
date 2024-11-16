import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActRegrecordComponent } from './act-regrecord.component';

describe('ActRegrecordComponent', () => {
  let component: ActRegrecordComponent;
  let fixture: ComponentFixture<ActRegrecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActRegrecordComponent]
    });
    fixture = TestBed.createComponent(ActRegrecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
