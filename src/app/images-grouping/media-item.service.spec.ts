import { TestBed } from '@angular/core/testing';

import { MediaItemService } from './media-item.service';

describe('MediaService', () => {
  let service: MediaItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediaItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
