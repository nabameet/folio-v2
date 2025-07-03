import { describe, it, expect } from 'vitest';
import { rgbDataURL } from './image';

describe('rgbDataURL', () => {
  it('returns a valid data URL', () => {
    const url = rgbDataURL(255, 0, 0);
    expect(url).toMatch(/^data:image\/gif;base64/);
    expect(url).toContain('R0lGODlhAQABAPAA');
  });
}); 