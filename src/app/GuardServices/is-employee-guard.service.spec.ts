import { TestBed } from '@angular/core/testing';

import { IsEmployeeGuardService } from './is-employee-guard.service';

describe('IsEmployeeGuardService', () => {
  let service: IsEmployeeGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsEmployeeGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
