import { TestBed } from '@angular/core/testing';
import { TwichApiService } from './twitch-api.service';

describe('TwichApiService', () => {
    let service: TwichApiService;
  
    beforeEach(() => {
      TestBed.configureTestingModule({});
      service = TestBed.inject(TwichApiService);
    });
  
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });