import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActIndexComponent } from './act-index.component';

describe('ActIndexComponent', () => {
  let component: ActIndexComponent;
  let fixture: ComponentFixture<ActIndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActIndexComponent]
    });
    fixture = TestBed.createComponent(ActIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
