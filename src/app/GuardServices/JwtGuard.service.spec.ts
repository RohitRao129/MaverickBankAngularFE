import { TestBed } from '@angular/core/testing';

import { JwtGuard } from './JwtGuard.service';

describe('JwtGuard', () => {
  let service: JwtGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
