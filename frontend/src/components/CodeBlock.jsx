import { useState, useMemo } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/tokyo-night-dark.css';

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
    <div className="my-6 rounded-lg overflow-hidden border border-[#414868] bg-[#16161e] shadow-xl group">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#1f2335] border-b border-[#414868]/60">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#f7768e]/90 shadow-sm" />
          <div className="w-3 h-3 rounded-full bg-[#e0af68]/90 shadow-sm" />
          <div className="w-3 h-3 rounded-full bg-[#9ece6a]/90 shadow-sm" />
          <span className="ml-2 font-mono text-xs text-[#a9b1d6] tracking-wide">
            {language || 'plaintext'}
          </span>
        </div>

        {/* Copy Button */}
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded border transition-all duration-200 cursor-pointer bg-[#24283b] border-[#414868] hover:border-[#7aa2f7] text-[#c0caf5] hover:text-[#7aa2f7]"
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5 text-[#9ece6a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-[#9ece6a] font-medium">Copied!</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5 text-[#7aa2f7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed bg-[#16161e]">
        <code
          className={`hljs language-${language || 'text'}`}
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
      </pre>
    </div>
  );
};

export default CodeBlock;
