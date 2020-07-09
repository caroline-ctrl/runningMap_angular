import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMpForgetComponent } from './user-mp-forget.component';

describe('UserMpForgetComponent', () => {
  let component: UserMpForgetComponent;
  let fixture: ComponentFixture<UserMpForgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMpForgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMpForgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
