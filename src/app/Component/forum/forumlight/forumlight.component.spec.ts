import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumlightComponent } from './forumlight.component';

describe('ForumlightComponent', () => {
  let component: ForumlightComponent;
  let fixture: ComponentFixture<ForumlightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForumlightComponent]
    });
    fixture = TestBed.createComponent(ForumlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
