import { TestBed } from '@angular/core/testing';
import { SortType } from './sort-type.service';

describe('SortType', () => {
    let service: SortType;
  
    beforeEach(() => {
      TestBed.configureTestingModule({});
      service = TestBed.inject(SortType);
    });
  
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });