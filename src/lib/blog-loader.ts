import { marked } from 'marked';
import type { BlogPost } from '@/types';

// Configure marked options
marked.setOptions({
  gfm: true, // GitHub Flavored Markdown
  breaks: true, // Convert \n to <br>
  headerIds: true, // Add ids to headers
  mangle: false, // Don't escape HTML
  headerPrefix: '', // Prefix for header ids
});

// Update glob pattern to include both md and tsx files
const blogFiles = import.meta.glob([
  '../content/blog/*.md',
  '../content/blog/*.tsx',
  '/src/content/blog/*.md',
  '/src/content/blog/*.tsx'
], { 
  eager: true,
  as: 'raw'
});

// Add function to detect if a file is a blog component
const isBlogComponent = (content: string): boolean => {
  // Check if it's a React component that uses PageLayout with blog metadata
  return content.includes('PageLayout') && 
         content.includes('title=') && 
         content.includes('description=') && 
         content.includes('badge=');
};

// Extract metadata from TSX component
const extractTsxMetadata = (content: string): Partial<BlogPost> => {
  const titleMatch = content.match(/title="([^"]+)"/);
  const descriptionMatch = content.match(/description="([^"]+)"/);
  const categoryMatch = content.match(/badge="([^"]+)"/);
  const dateMatch = content.match(/date="([^"]+)"/);
  const tagsMatch = content.match(/tags=\{(\[[^\]]+\])\}/);

  return {
    title: titleMatch?.[1] || '',
    description: descriptionMatch?.[1] || '',
    category: categoryMatch?.[1] || '',
    date: dateMatch?.[1] || '',
    tags: tagsMatch ? JSON.parse(tagsMatch[1].replace(/'/g, '"')) : [],
    summary: descriptionMatch?.[1] || ''
  };
};

export async function loadBlogPosts(): Promise<BlogPost[]> {
  // Get posts from markdown files
  const posts = await getAllBlogPosts();
  
  // Later we can add .tsx component loading here
  
  return posts;
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  console.log('Found blog files:', Object.keys(blogFiles));

  const posts = await Promise.all(
    Object.entries(blogFiles).map(async ([filepath, content]) => {
      const slug = filepath.split('/').pop()?.replace(/\.(md|tsx)$/, '');
      if (!slug) throw new Error(`Invalid filepath: ${filepath}`);
      
      try {
        if (filepath.endsWith('.tsx')) {
          // Handle TSX component
          const meta = extractTsxMetadata(content as string);
          return {
            id: slug,
            slug,
            url: `/blog/${slug}`,  // TSX components are always internal routes
            ...meta
          } as BlogPost;
        } else {
          // Handle MD file as before
          return await getBlogPost(slug, content as string);
        }
      } catch (error) {
        console.error(`Error processing ${filepath}:`, error);
        throw error;
      }
    })
  );

  const sortedPosts = posts.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  console.log('All posts loaded:', sortedPosts.map(p => p.title));
  return sortedPosts;
}

export async function getBlogPost(slug: string, content?: string): Promise<BlogPost> {
  // Try to find the content in blogFiles if not provided
  if (!content) {
    const possiblePaths = [
      `/src/content/blog/${slug}.md`,
      `../content/blog/${slug}.md`
    ];
    
    for (const path of possiblePaths) {
      if (blogFiles[path]) {
        content = blogFiles[path] as string;
        break;
      }
    }
  }

  if (!content) {
    console.error('Available files:', Object.keys(blogFiles));
    throw new Error(`Blog post content not found: ${slug}`);
  }

  // Split frontmatter and content
  const parts = content.split('---\n');
  if (parts.length < 3) {
    throw new Error(`Invalid markdown format for ${slug}`);
  }

  const frontmatter = parts[1]; // Skip empty first part
  const markdown = parts.slice(2).join('---\n');

  // Parse frontmatter
  const meta = parseFrontmatter(frontmatter);
  console.log('Parsed metadata for:', slug, meta);

  // Convert markdown to HTML (just the preview part)
  const htmlContent = marked(markdown);

  return {
    id: slug,
    slug,
    title: meta.title,
    date: meta.date,
    category: meta.category,
    tags: meta.tags || [],
    summary: meta.summary,
    url: meta.url,  // Include the URL
    content: htmlContent
  };
}

function parseFrontmatter(frontmatter: string) {
  const meta: Record<string, any> = {};
  const lines = frontmatter.split('\n');

  for (const line of lines) {
    const [key, ...valueParts] = line.split(':');
    if (!key || !valueParts.length) continue;

    let value = valueParts.join(':').trim();
    
    // Handle arrays (like tags)
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map(v => v.trim());
    }
    // Remove quotes if present
    else if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }

    meta[key.trim()] = value;
  }

  return meta;
} 