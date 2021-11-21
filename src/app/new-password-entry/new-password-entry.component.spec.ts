import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPasswordEntryComponent } from './new-password-entry.component';

describe('NewPasswordEntryComponent', () => {
  let component: NewPasswordEntryComponent;
  let fixture: ComponentFixture<NewPasswordEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPasswordEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPasswordEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
