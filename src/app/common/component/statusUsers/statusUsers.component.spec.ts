/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StatusUsersComponent } from './statusUsers.component';

describe('StatusUsersComponent', () => {
  let component: StatusUsersComponent;
  let fixture: ComponentFixture<StatusUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
