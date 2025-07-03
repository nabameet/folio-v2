import { describe, it, expect } from 'vitest';
import { formatDate } from './date';

describe('formatDate', () => {
  it('formats a date string to full date', () => {
    expect(formatDate('2024-06-01')).toMatch(/June 1, 2024/);
  });

  it('returns relative date for past years', () => {
    const yearAgo = `${new Date().getFullYear() - 1}-01-01`;
    expect(formatDate(yearAgo, true)).toMatch(/\(1y ago\)/);
  });

  it('returns Today for today', () => {
    const today = new Date().toISOString().slice(0, 10);
    expect(formatDate(today, true)).toMatch(/Today/);
  });
}); 