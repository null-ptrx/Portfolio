import { useEffect } from 'react';

/**
 * Custom hook to update document title and meta tags for SEO
 */
export function useSEO({ title, description, url, type = 'website' }) {
  useEffect(() => {
    const prevTitle = document.title;

    if (title) {
      document.title = title;
    }

    const setMetaTag = (attrName, attrValue, content) => {
      if (!content) return null;
      let el = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      let created = false;
      let prevContent = null;

      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
        created = true;
      } else {
        prevContent = el.getAttribute('content');
      }

      el.setAttribute('content', content);

      return () => {
        if (created) {
          if (el.parentNode) el.parentNode.removeChild(el);
        } else if (prevContent !== null) {
          el.setAttribute('content', prevContent);
        }
      };
    };

    const cleanups = [];

    if (description) {
      cleanups.push(setMetaTag('name', 'description', description));
      cleanups.push(setMetaTag('property', 'og:description', description));
      cleanups.push(setMetaTag('name', 'twitter:description', description));
    }

    if (title) {
      cleanups.push(setMetaTag('property', 'og:title', title));
      cleanups.push(setMetaTag('name', 'twitter:title', title));
    }

    if (type) {
      cleanups.push(setMetaTag('property', 'og:type', type));
    }

    const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
    if (currentUrl) {
      cleanups.push(setMetaTag('property', 'og:url', currentUrl));
    }

    cleanups.push(setMetaTag('name', 'twitter:card', 'summary_large_image'));

    return () => {
      document.title = prevTitle;
      cleanups.forEach((cleanup) => cleanup && cleanup());
    };
  }, [title, description, url, type]);
}
