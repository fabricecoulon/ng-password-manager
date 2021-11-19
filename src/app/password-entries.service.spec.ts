import { TestBed } from '@angular/core/testing';

import { PasswordEntriesService } from './password-entries.service';

describe('PasswordEntriesServiceService', () => {
  let service: PasswordEntriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordEntriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
