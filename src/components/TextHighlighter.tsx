'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function TextHighlighter() {
  const searchParams = useSearchParams();
  const highlight = searchParams.get('highlight');

  useEffect(() => {
    if (!highlight) return;

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

      // Scroll to first match
      if (firstMatch) {
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

  return null;
}
