import { TestBed } from '@angular/core/testing';

import { KeyApiInterceptor } from './key-api.interceptor';

describe('KeyApiInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      KeyApiInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: KeyApiInterceptor = TestBed.inject(KeyApiInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
