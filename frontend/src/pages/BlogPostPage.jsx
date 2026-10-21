import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CodeBlock from '../components/CodeBlock';
import { getPostBySlug, formatDate } from '../utils/blog';
import { useSEO } from '../utils/useSEO';

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = useMemo(() => getPostBySlug(slug), [slug]);

  // Set SEO metadata dynamically for the post
  useSEO({
    title: post ? `${post.title} | Dharmveer Singh` : 'Post Not Found | Blog',
    description: post ? post.description : 'The requested blog post could not be found.',
    type: 'article',
  });

  if (!post) {
    return (
      <div className="min-h-screen bg-[#1a1b26] text-[#c0caf5] flex flex-col justify-between selection:bg-[#7aa2f7]/30 selection:text-[#c0caf5]">
        <Navbar />
        <main className="flex-1 max-w-3xl mx-auto w-full px-4 pt-32 pb-20 flex flex-col items-center justify-center text-center">
          <div className="text-4xl mb-4 font-mono text-[#f7768e]">404 // Post Not Found</div>
          <p className="text-[#a9b1d6] mb-8 max-w-md">
            The article with slug <code className="text-[#7dcfff] font-mono">"{slug}"</code> could not be located in <code className="text-[#7dcfff] font-mono">content/blog/</code>.
          </p>
          <Link
            to="/blog"
            className="tn-btn-primary px-6 py-2.5 text-xs font-mono rounded-none no-underline flex items-center gap-2"
          >
            <span>←</span>
            <span>Back to all posts</span>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1b26] text-[#c0caf5] flex flex-col justify-between selection:bg-[#7aa2f7]/30 selection:text-[#c0caf5]">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 md:px-8 pt-28 pb-20">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#7aa2f7] hover:text-[#7dcfff] transition-colors group no-underline"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>Back to blog archive</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-10 pb-8 border-b border-[#414868]/60">
          {/* Post Meta */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#565f89] mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#7aa2f7]" />
              <time dateTime={post.date} className="text-[#a9b1d6]">
                {formatDate(post.date)}
              </time>
            </div>
            <span>·</span>
            <span className="text-[#9aa5ce]">{post.readingTime}</span>
          </div>

          {/* Post Title */}
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#c0caf5] tracking-tight leading-tight mb-6">
            {post.title}
          </h1>

          {/* Description Lead */}
          {post.description && (
            <p className="text-base md:text-lg text-[#a9b1d6] leading-relaxed mb-6 font-normal">
              {post.description}
            </p>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                to={`/blog?tag=${encodeURIComponent(tag)}`}
                className="tn-skill-tag px-2.5 py-1 text-xs rounded-none no-underline hover:border-[#73daca]"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </header>

        {/* Article Body */}
        <article className="prose-container">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                const language = match ? match[1] : '';
                const codeString = String(children);

                // Render multiline code or designated languages inside CodeBlock
                if (!inline && (match || codeString.includes('\n'))) {
                  return (
                    <CodeBlock
                      language={language}
                      code={codeString}
                      {...props}
                    />
                  );
                }

                // Inline code styling
                return (
                  <code
                    className="px-1.5 py-0.5 rounded bg-[#24283b] text-[#7dcfff] font-mono text-sm border border-[#414868]/60"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              h1({ children, ...props }) {
                return (
                  <h1
                    className="text-2xl md:text-3xl font-bold text-[#c0caf5] mt-10 mb-5 tracking-tight"
                    {...props}
                  >
                    {children}
                  </h1>
                );
              },
              h2({ children, ...props }) {
                return (
                  <h2
                    className="text-xl md:text-2xl font-bold text-[#7aa2f7] mt-10 mb-4 pb-2 border-b border-[#414868]/60 tracking-tight flex items-center gap-2"
                    {...props}
                  >
                    <span className="text-sm font-mono text-[#565f89]">#</span>
                    <span>{children}</span>
                  </h2>
                );
              },
              h3({ children, ...props }) {
                return (
                  <h3
                    className="text-lg md:text-xl font-semibold text-[#7dcfff] mt-8 mb-3 tracking-tight"
                    {...props}
                  >
                    {children}
                  </h3>
                );
              },
              h4({ children, ...props }) {
                return (
                  <h4
                    className="text-base md:text-lg font-semibold text-[#bb9af7] mt-6 mb-2"
                    {...props}
                  >
                    {children}
                  </h4>
                );
              },
              p({ children, ...props }) {
                return (
                  <p
                    className="text-[#a9b1d6] leading-relaxed mb-6 text-base"
                    {...props}
                  >
                    {children}
                  </p>
                );
              },
              ul({ children, ...props }) {
                return (
                  <ul
                    className="list-disc list-outside pl-6 mb-6 space-y-2 text-[#a9b1d6] marker:text-[#7aa2f7]"
                    {...props}
                  >
                    {children}
                  </ul>
                );
              },
              ol({ children, ...props }) {
                return (
                  <ol
                    className="list-decimal list-outside pl-6 mb-6 space-y-2 text-[#a9b1d6] marker:text-[#7dcfff] marker:font-mono"
                    {...props}
                  >
                    {children}
                  </ol>
                );
              },
              li({ children, ...props }) {
                return (
                  <li className="leading-relaxed" {...props}>
                    {children}
                  </li>
                );
              },
              blockquote({ children, ...props }) {
                return (
                  <blockquote
                    className="border-l-4 border-[#7aa2f7] bg-[#24283b]/60 p-4 my-6 rounded-r text-[#c0caf5] italic"
                    {...props}
                  >
                    {children}
                  </blockquote>
                );
              },
              a({ href, children, ...props }) {
                const isExternal = href?.startsWith('http');
                return (
                  <a
                    href={href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="text-[#7aa2f7] hover:text-[#7dcfff] underline underline-offset-4 decoration-[#7aa2f7]/50 hover:decoration-[#7dcfff] transition-colors"
                    {...props}
                  >
                    {children}
                  </a>
                );
              },
              table({ children, ...props }) {
                return (
                  <div className="overflow-x-auto my-6 border border-[#414868] rounded">
                    <table className="w-full text-left text-sm text-[#a9b1d6]" {...props}>
                      {children}
                    </table>
                  </div>
                );
              },
              thead({ children, ...props }) {
                return (
                  <thead className="bg-[#1f2335] text-[#c0caf5] font-mono text-xs uppercase" {...props}>
                    {children}
                  </thead>
                );
              },
              th({ children, ...props }) {
                return <th className="px-4 py-3 border-b border-[#414868]" {...props}>{children}</th>;
              },
              td({ children, ...props }) {
                return <td className="px-4 py-3 border-b border-[#414868]/40" {...props}>{children}</td>;
              },
              hr({ ...props }) {
                return <hr className="border-[#414868]/60 my-10" {...props} />;
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </article>

        {/* Article Footer & Return Nav */}
        <div className="mt-16 pt-8 border-t border-[#414868]/60 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/blog"
            className="tn-btn-outline px-4 py-2 text-xs font-mono rounded-none no-underline inline-flex items-center gap-2 cursor-pointer"
          >
            <span>←</span>
            <span>Back to all posts</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-mono text-[#565f89]">
            <span>// end of post</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPostPage;
