'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export default function TextHighlighter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const highlight = searchParams.get('highlight');
  const [isVisible, setIsVisible] = useState(false);

  const clearHighlights = () => {
    // Remove all highlights from DOM
    document.querySelectorAll('.search-highlight').forEach(el => {
      const parent = el.parentNode;
      if (parent) {
        parent.replaceChild(document.createTextNode(el.textContent || ''), el);
        parent.normalize();
      }
    });
    
    // Remove highlight parameter from URL
    router.replace(pathname);
    setIsVisible(false);
  };

  useEffect(() => {
    if (!highlight) {
      setIsVisible(false);
      return;
    }

    const highlightText = () => {
      // Remove previous highlights
      document.querySelectorAll('.search-highlight').forEach(el => {
        const parent = el.parentNode;
        if (parent) {
          parent.replaceChild(document.createTextNode(el.textContent || ''), el);
          parent.normalize();
        }
      });

      // Get all text nodes in the main content
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) => {
            // Skip script, style tags and already highlighted content
            const parent = node.parentElement;
            if (!parent) return NodeFilter.FILTER_REJECT;
            if (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE') {
              return NodeFilter.FILTER_REJECT;
            }
            if (parent.classList.contains('search-highlight')) {
              return NodeFilter.FILTER_REJECT;
            }
            return NodeFilter.FILTER_ACCEPT;
          }
        }
      );

      const textNodes: Node[] = [];
      let node;
      while (node = walker.nextNode()) {
        textNodes.push(node);
      }

      // Highlight matching text
      const searchRegex = new RegExp(`(${highlight})`, 'gi');
      let firstMatch: HTMLElement | null = null;

      textNodes.forEach(textNode => {
        const text = textNode.textContent || '';
        if (searchRegex.test(text)) {
          const span = document.createElement('span');
          span.innerHTML = text.replace(searchRegex, '<mark class="search-highlight bg-yellow-300 px-1 rounded">$1</mark>');
          textNode.parentNode?.replaceChild(span, textNode);
          
          // Store first match for scrolling
          if (!firstMatch) {
            firstMatch = span.querySelector('.search-highlight');
          }
        }
      });

      // Show clear button if matches found
      if (firstMatch) {
        setIsVisible(true);
        
        // Scroll to first match
        setTimeout(() => {
          if (firstMatch) {
            firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
      }
    };

    // Run after a short delay to ensure content is rendered
    const timer = setTimeout(highlightText, 300);
    return () => clearTimeout(timer);
  }, [highlight]);

  if (!isVisible) return null;

  return (
    <button
      onClick={clearHighlights}
      className="fixed bottom-24 left-4 z-50 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-110"
      aria-label="Clear highlights"
      title="Clear search highlights"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
      <span className="text-sm">נקה סימונים / Clear</span>
    </button>
  );
}
