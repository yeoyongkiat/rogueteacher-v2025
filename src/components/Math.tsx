import React from 'react';
import katex from 'katex';

interface MathProps {
  math: string;
  block?: boolean;
  label?: string;
}

export function Math({ math, block = false, label }: MathProps) {
  const html = katex.renderToString(math, {
    displayMode: block,
    throwOnError: false,
  });

  if (block && label) {
    return (
      <div className="flex items-center gap-4">
        <span dangerouslySetInnerHTML={{ __html: html }} />
        <span className="text-sm text-neutral-500 whitespace-nowrap">
          ({label})
        </span>
      </div>
    );
  }

  if (block) {
    return (
      <div className="my-2">
        <span dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    );
  }

  return <span dangerouslySetInnerHTML={{ __html: html }} />;
} 