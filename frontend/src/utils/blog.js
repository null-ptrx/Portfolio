import { load } from 'js-yaml';

// Load all markdown files from root content/blog, frontend/content/blog, and frontend/src/content/blog
const modules = import.meta.glob(
  [
    '../../../content/blog/*.{md,mdx,markdown}',
    '../../content/blog/*.{md,mdx,markdown}',
    '/src/content/blog/*.{md,mdx,markdown}',
  ],
  { query: '?raw', eager: true }
);

/**
 * Format title from slug: "bcrypt-vs-bcryptjs" -> "Bcrypt Vs Bcryptjs"
 */
function titleFromSlug(slug) {
  return slug
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Parse frontmatter and content from raw markdown string.
 * Gracefully handles files with or without YAML frontmatter.
 */
function parsePost(rawContent, slug) {
  const trimmed = rawContent.trim();
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = frontmatterRegex.exec(trimmed);

  let metadata = {};
  let content = trimmed;

  if (match) {
    const [, yamlBlock, body] = match;
    try {
      metadata = load(yamlBlock) || {};
    } catch (err) {
      console.error(`Failed to parse YAML frontmatter for "${slug}":`, err);
    }
    content = body.trim();
  } else {
    // Fallback: If no frontmatter, extract the first # Heading as title if present
    const headingMatch = /^#\s+(.+)$/m.exec(trimmed);
    if (headingMatch) {
      metadata.title = headingMatch[1].trim();
      // Remove that first H1 heading from content to prevent duplicate title display
      content = trimmed.replace(/^#\s+.+$/m, '').trim();
    }
    // Extract first non-empty paragraph as description if not set
    const firstParagraph = content.split(/\n\s*\n/).find((p) => !p.startsWith('#') && p.trim().length > 0);
    if (firstParagraph) {
      metadata.description = firstParagraph.replace(/[*_`#]/g, '').slice(0, 160) + (firstParagraph.length > 160 ? '...' : '');
    }
  }

  // Calculate approximate reading time (200 words per minute)
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(words / 200));

  // Normalize tags to an array of trimmed strings
  let tags = [];
  if (Array.isArray(metadata.tags)) {
    tags = metadata.tags.map((t) => String(t).trim()).filter(Boolean);
  } else if (typeof metadata.tags === 'string') {
    tags = metadata.tags.split(',').map((t) => t.trim()).filter(Boolean);
  }

  // Normalize date string (YYYY-MM-DD)
  let dateStr = '';
  if (metadata.date) {
    if (metadata.date instanceof Date) {
      dateStr = metadata.date.toISOString().split('T')[0];
    } else {
      dateStr = String(metadata.date).slice(0, 10);
    }
  }

  return {
    slug,
    title: metadata.title || titleFromSlug(slug),
    date: dateStr || new Date().toISOString().split('T')[0],
    description: metadata.description || '',
    tags,
    readingTime: `${readingTime} min read`,
    content,
  };
}

/**
 * Retrieve all blog posts, deduplicated by slug, sorted newest first
 */
export function getAllPosts() {
  const postMap = new Map();

  for (const [path, rawModule] of Object.entries(modules)) {
    const rawContent = typeof rawModule === 'string' ? rawModule : rawModule?.default || '';
    if (!rawContent) continue;

    // Extract slug from filename (e.g., ../../../content/blog/my-post.md -> my-post)
    const filename = path.split('/').pop() || '';
    const slug = filename.replace(/\.(md|mdx|markdown)$/, '');

    if (!slug) continue;

    // Only add if not already present or replace if current is more specific
    if (!postMap.has(slug)) {
      postMap.set(slug, parsePost(rawContent, slug));
    }
  }

  const posts = Array.from(postMap.values());

  // Sort newest first
  return posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime() || 0;
    const dateB = new Date(b.date).getTime() || 0;
    return dateB - dateA;
  });
}

/**
 * Get a single post by slug
 */
export function getPostBySlug(slug) {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug) || null;
}

/**
 * Get all unique tags with count: [{ tag: 'Docker', count: 2 }, ...]
 */
export function getAllTags() {
  const posts = getAllPosts();
  const counts = {};

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      counts[tag] = (counts[tag] || 0) + 1;
    });
  });

  return Object.entries(counts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/**
 * Format date string "2026-03-20" -> "March 20, 2026"
 */
export function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    const [year, month, day] = dateStr.split('-').map(Number);
    if (!year || !month || !day) return dateStr;
    const date = new Date(Date.UTC(year, month - 1, day));
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC',
    });
  } catch {
    return dateStr;
  }
}
