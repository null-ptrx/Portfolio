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

  useSEO({
    title: post ? `${post.title} | Dharmveer Singh` : 'Post Not Found | Blog',
    description: post ? post.description : 'The requested blog post could not be found.',
    type: 'article',
  });

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-start justify-center gap-6">
          <span className="font-mono text-xs bg-foreground text-background px-2.5 py-1">
            [404] NOT FOUND
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Post not found
          </h1>
          <p className="text-foreground-secondary max-w-md text-sm sm:text-base">
            The article with slug <code className="font-mono text-foreground">"{slug}"</code> could not be located in <code className="font-mono text-foreground">content/blog/</code>.
          </p>
          <Link
            to="/blog"
            className="mono-btn-primary px-5 py-2.5 text-sm no-underline"
          >
            Back to blog
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Article Header */}
        <header className="border-b border-border">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="mb-8">
              <Link to="/blog" className="mono-link text-xs font-mono">
                Back to blog
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-3 flex flex-col gap-3 text-xs font-mono text-muted-foreground">
                <time dateTime={post.date} className="text-foreground-secondary">
                  {formatDate(post.date)}
                </time>
                <span>{post.readingTime}</span>
                <div className="flex flex-wrap gap-2 pt-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      to={`/blog?tag=${encodeURIComponent(tag)}`}
                      className="px-2 py-0.5 border border-border bg-card text-foreground-secondary hover:border-border-strong hover:text-foreground no-underline transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-9 flex flex-col gap-5">
                <h1
                  className="font-display font-extrabold text-foreground tracking-tight"
                  style={{
                    fontSize: 'clamp(2rem, 4.5vw, 3.75rem)',
                    lineHeight: 1.04,
                    letterSpacing: '-0.04em',
                  }}
                >
                  {post.title}
                </h1>

                {post.description && (
                  <p className="text-base sm:text-lg text-foreground-secondary leading-relaxed max-w-3xl">
                    {post.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Article Body */}
        <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="hidden lg:block lg:col-span-3" />
            <article className="lg:col-span-9 max-w-3xl">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    const language = match ? match[1] : '';
                    const codeString = String(children);

                    if (!inline && (match || codeString.includes('\n'))) {
                      return (
                        <CodeBlock
                          language={language}
                          code={codeString}
                          {...props}
                        />
                      );
                    }

                    return (
                      <code
                        className="px-1.5 py-0.5 bg-secondary text-foreground font-mono text-sm border border-border"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                  h1({ children, ...props }) {
                    return (
                      <h1
                        className="font-display text-2xl sm:text-3xl font-bold text-foreground mt-10 mb-5 tracking-tight"
                        {...props}
                      >
                        {children}
                      </h1>
                    );
                  },
                  h2({ children, ...props }) {
                    return (
                      <h2
                        className="font-display text-xl sm:text-2xl font-bold text-foreground mt-10 mb-4 pb-2 border-b border-border tracking-tight"
                        {...props}
                      >
                        {children}
                      </h2>
                    );
                  },
                  h3({ children, ...props }) {
                    return (
                      <h3
                        className="font-display text-lg sm:text-xl font-semibold text-foreground mt-8 mb-3 tracking-tight"
                        {...props}
                      >
                        {children}
                      </h3>
                    );
                  },
                  h4({ children, ...props }) {
                    return (
                      <h4
                        className="font-display text-base sm:text-lg font-semibold text-foreground-secondary mt-6 mb-2"
                        {...props}
                      >
                        {children}
                      </h4>
                    );
                  },
                  p({ children, ...props }) {
                    return (
                      <p
                        className="text-foreground-secondary leading-relaxed mb-6 text-base"
                        {...props}
                      >
                        {children}
                      </p>
                    );
                  },
                  ul({ children, ...props }) {
                    return (
                      <ul
                        className="list-disc list-outside pl-6 mb-6 space-y-2 text-foreground-secondary marker:text-foreground"
                        {...props}
                      >
                        {children}
                      </ul>
                    );
                  },
                  ol({ children, ...props }) {
                    return (
                      <ol
                        className="list-decimal list-outside pl-6 mb-6 space-y-2 text-foreground-secondary marker:text-foreground marker:font-mono"
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
                        className="border-l-2 border-foreground bg-card p-4 my-6 text-foreground italic"
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
                        className="mono-link text-foreground"
                        {...props}
                      >
                        {children}
                      </a>
                    );
                  },
                  table({ children, ...props }) {
                    return (
                      <div className="overflow-x-auto my-6 border border-border">
                        <table className="w-full text-left text-sm text-foreground-secondary" {...props}>
                          {children}
                        </table>
                      </div>
                    );
                  },
                  thead({ children, ...props }) {
                    return (
                      <thead className="bg-secondary text-foreground font-mono text-xs uppercase" {...props}>
                        {children}
                      </thead>
                    );
                  },
                  th({ children, ...props }) {
                    return <th className="px-4 py-3 border-b border-border" {...props}>{children}</th>;
                  },
                  td({ children, ...props }) {
                    return <td className="px-4 py-3 border-b border-border" {...props}>{children}</td>;
                  },
                  hr({ ...props }) {
                    return <hr className="border-border my-10" {...props} />;
                  },
                }}
              >
                {post.content}
              </ReactMarkdown>

              <div className="mt-16 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4">
                <Link
                  to="/blog"
                  className="mono-btn-outline px-4 py-2 text-xs font-mono no-underline"
                >
                  Back to all posts
                </Link>
              </div>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPostPage;
