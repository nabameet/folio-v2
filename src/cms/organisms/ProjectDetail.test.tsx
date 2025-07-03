import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectDetail } from './ProjectDetail';
import { vi } from 'vitest';

vi.mock('../organisms/MDXContentRenderer', () => ({
  MDXContentRenderer: ({ source }: { source: string }) => <div>{source}</div>,
}));

const mockProject = {
  slug: 'test-1',
  metadata: {
    title: 'Test Project 1',
    publishedAt: '2024-06-01',
    summary: 'Summary 1',
    tags: 'a,b',
    image: '/img1.jpg',
  },
  content: '# Hello World\nContent here.',
};

describe('ProjectDetail', () => {
  it('renders project details by project prop', async () => {
    render(<ProjectDetail project={mockProject} />);
    expect(await screen.findByText('Test Project 1')).toBeTruthy();
    expect(await screen.findByText(/June 1, 2024/)).toBeTruthy();
    expect(await screen.findByText(/Hello World/)).toBeTruthy();
  });

  it('renders custom header and meta', async () => {
    render(
      <ProjectDetail
        project={mockProject}
        renderHeader={p => <h2>Header: {p.metadata.title}</h2>}
        renderMeta={p => <span>Meta: {p.metadata.tags}</span>}
      />
    );
    expect(await screen.findByText('Header: Test Project 1')).toBeTruthy();
    expect(await screen.findByText('Meta: a,b')).toBeTruthy();
  });

  it('shows not found for missing slug', () => {
    render(<ProjectDetail slug="not-exist" project={undefined} />);
    expect(screen.getByText(/not found/i)).toBeTruthy();
  });
}); 