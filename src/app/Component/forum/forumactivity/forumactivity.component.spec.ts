import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumactivityComponent} from './forumactivity.component';

describe('ForumactivityComponent', () => {
  let component: ForumactivityComponent;
  let fixture: ComponentFixture<ForumactivityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForumactivityComponent]
    });
    fixture = TestBed.createComponent(ForumactivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
