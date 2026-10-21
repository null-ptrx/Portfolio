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
    description: 'Technical articles, deep dives, and practical guides on backend engineering, Linux, Docker, and distributed systems.',
  });

  const allPosts = useMemo(() => getAllPosts(), []);
  const allTags = useMemo(() => getAllTags(), []);

  // Filter posts based on title search and tag selection
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
    <div className="min-h-screen bg-[#1a1b26] text-[#c0caf5] flex flex-col justify-between selection:bg-[#7aa2f7]/30 selection:text-[#c0caf5]">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 md:px-8 pt-28 pb-20">
        {/* Header Section */}
        <header className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-[#7aa2f7] mb-3">
            <span className="text-[#565f89]">//</span>
            <span>~/blog $ ls -la posts</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Engineering & <span className="tn-gradient-text">Architecture</span>
          </h1>
          <p className="text-[#a9b1d6] text-base md:text-lg max-w-2xl leading-relaxed">
            In-depth guides, practical architectures, and lessons learned from building resilient backend systems, containerized workflows, and Linux infrastructure.
          </p>
        </header>

        {/* Search & Tag Filter Bar */}
        <section className="mb-10 space-y-6">
          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#565f89]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts by title or keyword..."
              className="tn-input w-full pl-10 pr-10 py-3 text-sm rounded-none font-mono placeholder:font-sans placeholder:italic placeholder:text-[#565f89]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#565f89] hover:text-[#c0caf5] cursor-pointer"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Tags list */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-mono text-[#565f89] mr-2">filter by:</span>
            <button
              type="button"
              onClick={() => handleTagClick('')}
              className={`text-xs font-mono px-3 py-1.5 rounded-none border transition-all cursor-pointer ${
                !selectedTag
                  ? 'border-[#7aa2f7] bg-[#7aa2f7]/15 text-[#7aa2f7] shadow-[0_0_12px_rgba(122,162,247,0.2)]'
                  : 'border-[#414868] text-[#a9b1d6] hover:border-[#565f89] hover:text-[#c0caf5] bg-[#16161e]'
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
                  className={`text-xs font-mono px-3 py-1.5 rounded-none border transition-all cursor-pointer ${
                    isActive
                      ? 'border-[#7dcfff] bg-[#7dcfff]/15 text-[#7dcfff] shadow-[0_0_12px_rgba(125,207,255,0.2)]'
                      : 'border-[#414868] text-[#9aa5ce] hover:border-[#73daca] hover:text-[#73daca] bg-[#16161e]'
                  }`}
                >
                  #{tag} <span className="opacity-60 text-[10px]">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Active Filter Indicators */}
          {(searchQuery || selectedTag) && (
            <div className="flex items-center justify-between text-xs font-mono text-[#a9b1d6] bg-[#1f2335]/70 border border-[#414868]/60 p-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span>Active filters:</span>
                {searchQuery && (
                  <span className="px-2 py-0.5 bg-[#24283b] text-[#7aa2f7] border border-[#414868]">
                    search: "{searchQuery}"
                  </span>
                )}
                {selectedTag && (
                  <span className="px-2 py-0.5 bg-[#24283b] text-[#7dcfff] border border-[#414868]">
                    tag: #{selectedTag}
                  </span>
                )}
                <span>— Showing {filteredPosts.length} of {allPosts.length} posts</span>
              </div>
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs text-[#f7768e] hover:underline cursor-pointer ml-auto"
              >
                [reset filters]
              </button>
            </div>
          )}
        </section>

        {/* Posts Grid / List */}
        <section className="space-y-6">
          {filteredPosts.length === 0 ? (
            <div className="tn-card p-12 text-center rounded-none border border-dashed border-[#414868]">
              <div className="text-3xl mb-3">🔍</div>
              <h3 className="text-lg font-semibold text-[#c0caf5] mb-2 font-mono">No posts found</h3>
              <p className="text-sm text-[#a9b1d6] max-w-md mx-auto mb-6">
                No articles matched your search query or selected tag filter. Try adjusting your search keywords.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="tn-btn-outline px-4 py-2 text-xs font-mono rounded-none cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="tn-card p-6 md:p-8 rounded-none flex flex-col gap-4 group transition-all duration-300"
              >
                {/* Meta info: Date & Reading Time */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#565f89]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#7aa2f7]" />
                    <time dateTime={post.date} className="text-[#a9b1d6]">
                      {formatDate(post.date)}
                    </time>
                  </div>
                  <span className="text-[#565f89]">{post.readingTime}</span>
                </div>

                {/* Title */}
                <h2 className="text-xl md:text-2xl font-bold text-[#c0caf5] group-hover:text-[#7aa2f7] transition-colors tracking-tight">
                  <Link to={`/blog/${post.slug}`} className="no-underline block">
                    {post.title}
                  </Link>
                </h2>

                {/* Description */}
                <p className="text-sm md:text-base text-[#a9b1d6] leading-relaxed">
                  {post.description}
                </p>

                {/* Tags & Read Link Footer */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#414868]/40 mt-2">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleTagClick(tag)}
                        className="tn-skill-tag px-2.5 py-1 text-xs rounded-none cursor-pointer bg-[#1a1b26]/60 hover:border-[#73daca]"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#7aa2f7] group-hover:text-[#7dcfff] group-hover:translate-x-1 transition-all no-underline"
                  >
                    <span>Read article</span>
                    <span>→</span>
                  </Link>
                </div>
              </article>
            ))
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
