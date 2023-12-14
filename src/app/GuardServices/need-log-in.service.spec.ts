import { TestBed } from '@angular/core/testing';

import { NeedLoginCheck } from './need-log-in.service';

describe('LoggedInService', () => {
  let service: NeedLoginCheck;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NeedLoginCheck);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
