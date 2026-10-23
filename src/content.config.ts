import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const link = z.object({ label: z.string(), url: z.string().url() });

// One Markdown file per achievement, in content/milestones/
const milestones = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/milestones' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    type: z.enum(['publication', 'recognition', 'award', 'career', 'talk', 'release']),
    org: z.string().optional(),
    book: z.string().optional(),
    authors: z.string().optional(),
    doi: z.string().optional(),
    links: z.array(link).default([]),
    tags: z.array(z.string()).default([]),
  }),
});

// Apps and side projects, in content/projects/
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/projects' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    stack: z.array(z.string()).default([]),
    repo: z.string().url().optional(),
    // YouTube video id, e.g. "X6G872kgeIE"
    demoVideo: z.string().optional(),
    // Direct .mp4 URL, played with the browser's own player
    videoFile: z.string().url().optional(),
    links: z.array(link).default([]),
  }),
});

// Longer stories, in content/posts/
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { milestones, projects, posts };
