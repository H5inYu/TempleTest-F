import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumstoryComponent } from './forumstory.component';

describe('ForumstoryComponent', () => {
  let component: ForumstoryComponent;
  let fixture: ComponentFixture<ForumstoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForumstoryComponent]
    });
    fixture = TestBed.createComponent(ForumstoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
