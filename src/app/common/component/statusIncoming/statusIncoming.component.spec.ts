/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StatusIncomingComponent } from './statusIncoming.component';

describe('StatusIncomingComponent', () => {
  let component: StatusIncomingComponent;
  let fixture: ComponentFixture<StatusIncomingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusIncomingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusIncomingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
