import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActDetailComponent } from './act-detail.component';

describe('ActDetailComponent', () => {
  let component: ActDetailComponent;
  let fixture: ComponentFixture<ActDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActDetailComponent]
    });
    fixture = TestBed.createComponent(ActDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
