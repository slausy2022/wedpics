/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ImageSelectionService } from './image-selection.service';

describe('Service: ImageSelection', () => {
  let service: ImageSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
