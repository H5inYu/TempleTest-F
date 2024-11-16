import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumstartComponent } from './forumstart.component';

describe('ForumstartComponent', () => {
  let component: ForumstartComponent;
  let fixture: ComponentFixture<ForumstartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForumstartComponent]
    });
    fixture = TestBed.createComponent(ForumstartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
