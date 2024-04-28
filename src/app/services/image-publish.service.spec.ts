import { TestBed } from '@angular/core/testing';

import { ImagePublishService } from './image-publish.service';

describe('ImagePublishService', () => {
  let service: ImagePublishService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagePublishService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
