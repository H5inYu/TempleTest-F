import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActRegComponent } from './act-reg.component';

describe('ActRegComponent', () => {
  let component: ActRegComponent;
  let fixture: ComponentFixture<ActRegComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActRegComponent]
    });
    fixture = TestBed.createComponent(ActRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
