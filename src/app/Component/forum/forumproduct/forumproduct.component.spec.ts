import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumproductComponent } from './forumproduct.component';

describe('ForumproductComponent', () => {
  let component: ForumproductComponent;
  let fixture: ComponentFixture<ForumproductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForumproductComponent]
    });
    fixture = TestBed.createComponent(ForumproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
