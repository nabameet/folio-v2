import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import fs from 'fs';
import path from 'path';
import * as mdxUtils from './mdx';

const mockMDX = `---
title: Test Project
publishedAt: 2024-06-01
summary: This is a test project.
tags: test,mdx
image: /test.jpg
---

# Hello World\nContent here.`;

const mockDir = '/tmp/cms-test';
const mockFile = 'test-project.mdx';

beforeAll(() => {
  fs.mkdirSync(mockDir, { recursive: true });
  fs.writeFileSync(path.join(mockDir, mockFile), mockMDX);
});
afterAll(() => {
  fs.rmSync(mockDir, { recursive: true, force: true });
});

describe('mdx utils', () => {
  it('parses frontmatter correctly', () => {
    const { metadata, content } = mdxUtils.parseFrontmatter(mockMDX);
    expect(metadata.title).toBe('Test Project');
    expect(metadata.publishedAt).toBe('2024-06-01');
    expect(metadata.summary).toBe('This is a test project.');
    expect(metadata.tags).toBe('test,mdx');
    expect(metadata.image).toBe('/test.jpg');
    expect(content).toContain('# Hello World');
  });

  it('gets MDX files from a directory', () => {
    const files = mdxUtils.getMDXFiles(mockDir);
    expect(files).toContain(mockFile);
  });

  it('reads an MDX file and parses it', () => {
    const { metadata, content } = mdxUtils.readMDXFile(path.join(mockDir, mockFile));
    expect(metadata.title).toBe('Test Project');
    expect(content).toContain('Hello World');
  });

  it('gets MDX data from a directory', () => {
    const data = mdxUtils.getMDXData(mockDir);
    expect(data.length).toBe(1);
    expect(data[0].slug).toBe('test-project');
  });

  it('throws an error for missing frontmatter', () => {
    const invalidMDX = `# Hello World\nContent here.`;
    expect(() => mdxUtils.parseFrontmatter(invalidMDX)).toThrow('No frontmatter found');
  });
}); 