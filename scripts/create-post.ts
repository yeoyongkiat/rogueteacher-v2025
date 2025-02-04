#!/usr/bin/env node
import { promises as fs } from 'fs';
import path from 'path';
import { createInterface } from 'readline';
import { fileURLToPath } from 'url';

// Fix __dirname in ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

async function prompt(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question + ' ', resolve);
  });
}

async function createPost() {
  try {
    // Get post details
    const title = await prompt('Post title:');
    const category = await prompt('Category:');
    const tags = (await prompt('Tags (comma-separated):')).split(',').map(t => t.trim());
    const summary = await prompt('Summary:');

    // Generate metadata
    const date = new Date().toISOString().split('T')[0];
    const slug = title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') // Replace special chars with hyphens
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens

    // Create markdown content
    const content = `---
title: "${title}"
date: "${date}"
category: "${category}"
tags: ${JSON.stringify(tags)}
summary: "${summary}"
---

# ${title}

Write your post content here...
`;

    // Ensure blog directory exists
    const blogDir = path.join(process.cwd(), 'src', 'content', 'blog');
    await fs.mkdir(blogDir, { recursive: true });

    // Write the file
    const filePath = path.join(blogDir, `${slug}.md`);
    await fs.writeFile(filePath, content, 'utf-8');

    console.log(`\n✨ Created new post: ${filePath}`);
    console.log(`\n📝 Start writing your post in the created file!`);
  } catch (error) {
    console.error('Error creating post:', error);
  } finally {
    rl.close();
  }
}

// Add error handling
process.on('uncaughtException', (error) => {
  console.error('An error occurred:', error);
  process.exit(1);
});

createPost(); 