import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getAllPosts, getAllTags, formatDate } from '../utils/blog';
import { useSEO } from '../utils/useSEO';

const BlogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTag = searchParams.get('tag') || '';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState(initialTag);

  useSEO({
    title: 'Blog | Dharmveer Singh — Backend Developer',
    description:
      'Technical articles, deep dives, and practical guides on backend engineering, Linux, Docker, and distributed systems.',
  });

  const allPosts = useMemo(() => getAllPosts(), []);
  const allTags = useMemo(() => getAllTags(), []);

  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const matchesSearch =
        !searchQuery.trim() ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTag =
        !selectedTag ||
        post.tags.some((tag) => tag.toLowerCase() === selectedTag.toLowerCase());

      return matchesSearch && matchesTag;
    });
  }, [allPosts, searchQuery, selectedTag]);

  const handleTagClick = (tag) => {
    if (selectedTag.toLowerCase() === tag.toLowerCase()) {
      setSelectedTag('');
      setSearchParams({});
    } else {
      setSelectedTag(tag);
      setSearchParams({ tag });
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTag('');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="border-b border-border">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8 flex flex-col gap-4">
                <h1
                  className="font-display font-extrabold tracking-tight"
                  style={{
                    fontSize: 'clamp(2.25rem, 5vw, 4.25rem)',
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                  }}
                >
                  Engineering & Architecture
                </h1>
                <p className="text-foreground-secondary text-base sm:text-lg max-w-2xl leading-relaxed">
                  Guides, architectures, and notes from building backend services, containerized workflows, and Linux infrastructure.
                </p>
              </div>
              <div className="lg:col-span-4 flex lg:justify-end">
                <span className="font-mono text-xs text-muted-foreground border border-border px-3 py-1.5">
                  {allPosts.length} {allPosts.length === 1 ? 'article' : 'articles'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Search & Filter Bar */}
        <section className="border-b border-border bg-card">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-5">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
              <div className="lg:col-span-6 relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search posts by title or keyword..."
                  className="mono-input w-full px-4 py-2.5 pr-10 text-sm"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-xs font-mono text-muted-foreground hover:text-foreground cursor-pointer"
                    aria-label="Clear search"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="lg:col-span-6 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleTagClick('')}
                  className={`text-xs font-mono px-3 py-1.5 border transition-colors cursor-pointer ${
                    !selectedTag
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-border text-foreground-secondary hover:border-border-strong hover:text-foreground bg-background'
                  }`}
                >
                  All ({allPosts.length})
                </button>

                {allTags.map(({ tag, count }) => {
                  const isActive = selectedTag.toLowerCase() === tag.toLowerCase();
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleTagClick(tag)}
                      className={`text-xs font-mono px-3 py-1.5 border transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'border-border text-foreground-secondary hover:border-border-strong hover:text-foreground bg-background'
                      }`}
                    >
                      #{tag} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {(searchQuery || selectedTag) && (
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-foreground-secondary border-t border-border pt-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span>
                    Showing {filteredPosts.length} of {allPosts.length}
                  </span>
                  {searchQuery && (
                    <span className="px-2 py-0.5 border border-border bg-background">
                      query: "{searchQuery}"
                    </span>
                  )}
                  {selectedTag && (
                    <span className="px-2 py-0.5 border border-border bg-background">
                      tag: #{selectedTag}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mono-link cursor-pointer"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Posts List */}
        <section>
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            {filteredPosts.length === 0 ? (
              <div className="border border-border bg-card p-10 sm:p-14 flex flex-col items-start gap-4">
                <h2 className="font-display text-xl font-bold text-foreground">
                  No posts matched
                </h2>
                <p className="text-sm text-foreground-secondary max-w-md">
                  No articles matched your current search query or tag filter.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mono-btn-outline px-4 py-2 text-xs font-mono cursor-pointer"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="border border-border divide-y divide-border">
                {filteredPosts.map((post) => (
                  <article
                    key={post.slug}
                    className="bg-card hover:bg-secondary transition-colors p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
                  >
                    <div className="lg:col-span-3 flex flex-col gap-1 text-xs font-mono text-muted-foreground">
                      <time dateTime={post.date} className="text-foreground-secondary">
                        {formatDate(post.date)}
                      </time>
                      <span>{post.readingTime}</span>
                    </div>

                    <div className="lg:col-span-9 flex flex-col gap-4">
                      <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                        <Link to={`/blog/${post.slug}`} className="no-underline hover:underline underline-offset-4 decoration-1">
                          {post.title}
                        </Link>
                      </h2>

                      <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed max-w-3xl">
                        {post.description}
                      </p>

                      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => handleTagClick(tag)}
                              className="px-2.5 py-1 text-xs font-mono border border-border bg-background text-foreground-secondary hover:border-border-strong hover:text-foreground cursor-pointer transition-colors"
                            >
                              #{tag}
                            </button>
                          ))}
                        </div>

                        <Link
                          to={`/blog/${post.slug}`}
                          className="mono-link text-xs font-mono"
                        >
                          Read article
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
