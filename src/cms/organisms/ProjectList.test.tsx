import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProjectList } from './ProjectList';

const mockProjects = [
  {
    slug: 'test-1',
    metadata: {
      title: 'Test Project 1',
      publishedAt: '2024-06-01',
      summary: 'Summary 1',
      tags: 'a,b',
      image: '/img1.jpg',
    },
    content: '# Content 1',
  },
  {
    slug: 'test-2',
    metadata: {
      title: 'Test Project 2',
      publishedAt: '2024-06-02',
      summary: 'Summary 2',
      tags: 'c,d',
      image: '/img2.jpg',
    },
    content: '# Content 2',
  },
];

describe('ProjectList', () => {
  it('renders a list of projects', () => {
    render(<ProjectList projects={mockProjects} />);
    expect(screen.getByText('Test Project 1')).toBeTruthy();
    expect(screen.getByText('Test Project 2')).toBeTruthy();
  });

  it('renders an empty state correctly', () => {
    const { container } = render(<ProjectList projects={[]} />);
    expect(container.firstChild).toBeEmptyDOMElement();
  });
});