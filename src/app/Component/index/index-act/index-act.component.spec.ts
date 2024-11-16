import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexActComponent } from './index-act.component';

describe('IndexActComponent', () => {
  let component: IndexActComponent;
  let fixture: ComponentFixture<IndexActComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndexActComponent]
    });
    fixture = TestBed.createComponent(IndexActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
