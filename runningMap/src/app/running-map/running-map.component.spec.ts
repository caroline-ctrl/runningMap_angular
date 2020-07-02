import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningMapComponent } from './running-map.component';

describe('RunningMapComponent', () => {
  let component: RunningMapComponent;
  let fixture: ComponentFixture<RunningMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunningMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunningMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
