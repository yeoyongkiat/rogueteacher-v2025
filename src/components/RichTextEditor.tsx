import React from 'react';
import { Math } from './Math';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  multiline?: boolean;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder,
  className = '',
  multiline = false
}: RichTextEditorProps) {
  const renderContent = () => {
    // Split content by math delimiters
    const parts = value.split(/(\$[^$]+\$)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('$') && part.endsWith('$')) {
        // Render math content
        const mathContent = part.slice(1, -1);
        return <Math key={index} math={mathContent} />;
      }
      // Render text content with markdown-style formatting
      return <span key={index} dangerouslySetInnerHTML={{ 
        __html: part
          .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.+?)\*/g, '<em>$1</em>')
          .replace(/__(.+?)__/g, '<u>$1</u>')
          .replace(/~~(.+?)~~/g, '<del>$1</del>')
          .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[rgb(43,154,154)] hover:underline">$1</a>')
      }} />;
    });
  };

  return (
    <div className="space-y-2">
      {multiline ? (
        <textarea
          data-rich-editor
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full min-h-[100px] p-2 border rounded ${className}`}
        />
      ) : (
        <input
          data-rich-editor
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full p-2 border rounded ${className}`}
        />
      )}

    </div>
  );
} 