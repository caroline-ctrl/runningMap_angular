import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrsLoopComponent } from './ors-loop.component';

describe('OrsLoopComponent', () => {
  let component: OrsLoopComponent;
  let fixture: ComponentFixture<OrsLoopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrsLoopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrsLoopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
