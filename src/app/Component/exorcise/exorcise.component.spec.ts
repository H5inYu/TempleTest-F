import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExorciseComponent } from './exorcise.component';

describe('ExorciseComponent', () => {
  let component: ExorciseComponent;
  let fixture: ComponentFixture<ExorciseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExorciseComponent]
    });
    fixture = TestBed.createComponent(ExorciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
