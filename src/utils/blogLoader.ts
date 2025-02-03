import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import fs from 'fs';
import path from 'path';

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  summary: string;
  content?: string;
  isOldArticle?: boolean;
}

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const files = fs.readdirSync(BLOG_DIR);
  
  const posts = await Promise.all(
    files.map(async (filename) => {
      const slug = filename.replace('.md', '');
      return await getBlogPost(slug);
    })
  );

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getBlogPost(slug: string): Promise<BlogPost> {
  const fullPath = path.join(BLOG_DIR, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Parse frontmatter
  const { data, content } = matter(fileContents);

  // Convert markdown to HTML
  const processedContent = await remark()
    .use(html)
    .process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title,
    date: data.date,
    category: data.category,
    tags: data.tags,
    summary: data.summary,
    content: contentHtml,
    isOldArticle: data.isOldArticle
  };
} 