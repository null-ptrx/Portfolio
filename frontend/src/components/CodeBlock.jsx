import { useState, useMemo } from 'react';
import hljs from 'highlight.js';

const CodeBlock = ({ language, code }) => {
  const [copied, setCopied] = useState(false);

  const cleanCode = useMemo(() => {
    return String(code || '').replace(/\n$/, '');
  }, [code]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cleanCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard', err);
    }
  };

  const highlightedHtml = useMemo(() => {
    if (!cleanCode) return '';
    try {
      if (language && hljs.getLanguage(language)) {
        return hljs.highlight(cleanCode, { language }).value;
      }
      return hljs.highlightAuto(cleanCode).value;
    } catch {
      return cleanCode;
    }
  }, [cleanCode, language]);

  return (
    <div className="my-6 border border-border bg-card">
      <div className="flex items-center justify-between px-4 py-2 bg-secondary border-b border-border">
        <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
          {language || 'plaintext'}
        </span>

        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
          className="mono-btn-outline px-2.5 py-1 text-xs font-mono cursor-pointer"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed bg-card">
        <code
          className={`hljs language-${language || 'text'}`}
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
      </pre>
    </div>
  );
};

export default CodeBlock;
