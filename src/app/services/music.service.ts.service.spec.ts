import { TestBed } from '@angular/core/testing';

import { MusicServiceTsService } from './music.service.ts.service';

describe('MusicServiceTsService', () => {
  let service: MusicServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
