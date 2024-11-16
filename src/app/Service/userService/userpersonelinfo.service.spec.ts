import { TestBed } from '@angular/core/testing';

import { UserpersonelinfoService } from './userpersonelinfo.service';

describe('UserpersonelinfoService', () => {
  let service: UserpersonelinfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserpersonelinfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
