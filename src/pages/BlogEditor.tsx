import React, { useState, useRef } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Eye, Plus, GripVertical, X, Upload } from 'lucide-react';
import { Math } from '@/components/Math';
import { useClickOutside } from '@/hooks/useClickOutside';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { RichTextEditor } from '@/components/RichTextEditor';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

type BlockType = 
  | 'header1' 
  | 'header2' 
  | 'header3'
  | 'header4'
  | 'paragraph'
  | 'equation'
  | 'code'
  | 'quote'
  | 'image'
  | 'orderedList'
  | 'unorderedList'
  | 'video'
  | 'equationWithLabel'
  | 'equationSection';

interface ContentBlock {
  id: string;
  type: BlockType;
  content: string;
  properties?: Record<string, any>;
}

interface BlogPost {
  title: string;
  description: string;
  category: string;
  date: string;
  tags: string[];
  blocks: ContentBlock[];
}

interface EquationSectionProperties {
  label?: string;
  legend?: { symbol: string; description: string; }[];
  description?: string;
}

export default function BlogEditor() {
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost>({
    title: '',
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    tags: [],
    blocks: []
  });
  const [newTag, setNewTag] = useState('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, () => setIsAddMenuOpen(false));
  const [componentName, setComponentName] = useState(post.title || '');

  const blockTypes = [
    { type: 'header1', label: 'Header 1' },
    { type: 'header2', label: 'Header 2' },
    { type: 'header3', label: 'Header 3' },
    { type: 'paragraph', label: 'Paragraph' },
    { type: 'equationWithLabel', label: 'Labelled Eqn' },
    { type: 'quote', label: 'Quote' },
    { type: 'code', label: 'Code' },
    { type: 'image', label: 'Image' },
    { type: 'video', label: 'Video' },
    { type: 'orderedList', label: 'Ordered List' },
    { type: 'unorderedList', label: 'Unordered List' },
    { type: 'equationSection', label: 'Eqn Section' },
  ] as const;

  const handleAddTag = () => {
    if (newTag && !post.tags.includes(newTag)) {
      setPost(prev => ({
        ...prev,
        tags: [...prev.tags, newTag]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setPost(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addBlock = (type: BlockType) => {
    setPost(prev => ({
      ...prev,
      blocks: [...prev.blocks, {
        id: crypto.randomUUID(),
        type,
        content: '',
        properties: {}
      }]
    }));
  };

  const updateBlock = (id: string, content: string, properties?: Record<string, any>) => {
    setPost(prev => ({
      ...prev,
      blocks: prev.blocks.map(block => 
        block.id === id 
          ? { ...block, content, ...(properties && { properties }) }
          : block
      )
    }));
  };

  const removeBlock = (id: string) => {
    setPost(prev => ({
      ...prev,
      blocks: prev.blocks.filter(block => block.id !== id)
    }));
  };

  const handleAddBlock = (type: BlockType) => {
    addBlock(type);
    setIsAddMenuOpen(false);
  };

  const getYouTubeEmbedUrl = (url: string) => {
    try {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      
      if (match && match[2].length === 11) {
        return `https://www.youtube.com/embed/${match[2]}`;
      }
      return url;
    } catch {
      return url;
    }
  };

  const renderFormattedContent = (content: string) => {
    // First split by math delimiters
    const parts = content.split(/(\$[^$]+\$)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('$') && part.endsWith('$')) {
        // Render math content
        const mathContent = part.slice(1, -1);
        return <Math key={index} math={mathContent} />;
      }

      // For non-math content, handle other formatting including links
      // Split the content to handle links separately
      const fragments = part.split(/(\[[^\]]+\]\([^)]+\))/g);
      
      return fragments.map((fragment, fragIndex) => {
        // Check if this fragment is a link
        const linkMatch = fragment.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (linkMatch) {
          const [_, text, url] = linkMatch;
          // Use the URL as-is without any modification
          return (
            <a 
              key={`${index}-${fragIndex}`}
              href={url}
              className="text-[rgb(43,154,154)] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {text}
            </a>
          );
        }

        // Handle other formatting for non-link text
        return (
          <span 
            key={`${index}-${fragIndex}`}
            dangerouslySetInnerHTML={{ 
              __html: fragment
                .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.+?)\*/g, '<em>$1</em>')
                .replace(/__(.+?)__/g, '<u>$1</u>')
                .replace(/~~(.+?)~~/g, '<del>$1</del>')
            }} 
          />
        );
      });
    });
  };

  const renderBlockEditor = (block: ContentBlock) => {
    switch (block.type) {
      case 'header1':
      case 'header2':
      case 'header3':
      case 'header4':
        return (
          <RichTextEditor
            value={block.content}
            onChange={content => updateBlock(block.id, content)}
            className={`font-bold ${
              block.type === 'header1' ? 'text-4xl' :
              block.type === 'header2' ? 'text-3xl' :
              block.type === 'header3' ? 'text-2xl' :
              'text-xl'
            }`}
            placeholder={`${block.type.replace(/\d/, '')} heading`}
          />
        );
      
      case 'paragraph':
        return (
          <RichTextEditor
            value={block.content}
            onChange={content => updateBlock(block.id, content)}
            className="text-neutral-700 leading-relaxed"
            placeholder="Enter paragraph text"
            multiline
          />
        );

      case 'equationWithLabel':
        return (
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                value={block.content}
                onChange={e => updateBlock(block.id, e.target.value)}
                placeholder="Enter LaTeX equation"
                className="flex-grow"
              />
              <Input
                value={block.properties?.label || ''}
                onChange={e => updateBlock(block.id, block.content, { ...block.properties, label: e.target.value })}
                placeholder="Equation label (e.g., Eqn. 1)"
                className="w-32"
              />
            </div>
            <div className="p-4 bg-neutral-50 rounded">
              <Math math={block.content} block label={block.properties?.label} />
            </div>
          </div>
        );

      case 'quote':
        return (
          <div className="space-y-2">
            <RichTextEditor
              value={block.content}
              onChange={content => updateBlock(block.id, content)}
              placeholder="Enter quote text"
              className="italic"
              multiline
            />
            <Input
              value={block.properties?.author || ''}
              onChange={e => updateBlock(block.id, block.content, { ...block.properties, author: e.target.value })}
              placeholder="Quote author"
              className="text-sm text-neutral-500"
            />
          </div>
        );

      case 'code':
        return (
          <div className="space-y-2">
            <Input
              value={block.properties?.language || ''}
              onChange={e => updateBlock(block.id, block.content, { ...block.properties, language: e.target.value })}
              placeholder="Programming language (e.g., javascript)"
              className="text-sm"
            />
            <Textarea
              value={block.content}
              onChange={e => updateBlock(block.id, e.target.value)}
              className="font-mono min-h-[150px]"
              placeholder="Enter code"
            />
          </div>
        );

      case 'image':
        return (
          <div className="space-y-2">
            <Input
              value={block.content}
              onChange={e => updateBlock(block.id, e.target.value)}
              placeholder="Image URL"
            />
            <RichTextEditor
              value={block.properties?.alt || ''}
              onChange={alt => updateBlock(block.id, block.content, { ...block.properties, alt })}
              placeholder="Image description"
              multiline
            />
            {block.content && (
              <div className="relative aspect-video rounded-lg overflow-hidden bg-neutral-100">
                <img
                  src={block.content}
                  alt={block.properties?.alt}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
          </div>
        );

      case 'video':
        return (
          <div className="space-y-2">
            <Input
              value={block.content}
              onChange={e => updateBlock(block.id, e.target.value)}
              placeholder="Video URL (YouTube, Vimeo, etc.)"
            />
            <RichTextEditor
              value={block.properties?.description || ''}
              onChange={description => updateBlock(block.id, block.content, { ...block.properties, description })}
              placeholder="Video description"
              multiline
            />
            {block.content && (
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <iframe
                  src={getYouTubeEmbedUrl(block.content)}
                  className="absolute inset-0 w-full h-full"
                  title="Video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        );

      case 'orderedList':
      case 'unorderedList':
        return (
          <div className="space-y-2">
            <Textarea
              value={block.content}
              onChange={e => updateBlock(block.id, e.target.value)}
              placeholder="Enter list items (one per line)"
              className="min-h-[100px]"
            />
            <div className={block.type === 'orderedList' ? 'list-decimal' : 'list-disc'}>
              {block.content.split('\n').map((item, i) => (
                <div key={i} className="ml-6">{item}</div>
              ))}
            </div>
          </div>
        );

      case 'equationSection':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  value={block.content}
                  onChange={e => updateBlock(block.id, e.target.value)}
                  placeholder="Enter LaTeX equation"
                  className="flex-grow"
                />
                <Input
                  value={block.properties?.label || ''}
                  onChange={e => updateBlock(
                    block.id, 
                    block.content, 
                    { ...block.properties, label: e.target.value }
                  )}
                  placeholder="Equation label (e.g., Eqn. 1)"
                  className="w-32"
                />
              </div>
              <div className="p-4 bg-neutral-50 rounded">
                <Math math={block.content} block label={block.properties?.label} />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Legend:</p>
              <div className="space-y-2">
                {(block.properties?.legend || []).map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={item.symbol}
                      onChange={e => {
                        const newLegend = [...(block.properties?.legend || [])];
                        newLegend[index] = { ...item, symbol: e.target.value };
                        updateBlock(block.id, block.content, { ...block.properties, legend: newLegend });
                      }}
                      placeholder="Symbol"
                      className="w-32"
                    />
                    <Input
                      value={item.description}
                      onChange={e => {
                        const newLegend = [...(block.properties?.legend || [])];
                        newLegend[index] = { ...item, description: e.target.value };
                        updateBlock(block.id, block.content, { ...block.properties, legend: newLegend });
                      }}
                      placeholder="Description"
                      className="flex-grow"
                    />
                    <Button
                      variant="outline"
                      onClick={() => {
                        const newLegend = block.properties?.legend?.filter((_, i) => i !== index) || [];
                        updateBlock(block.id, block.content, { ...block.properties, legend: newLegend });
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => {
                    const newLegend = [...(block.properties?.legend || []), { symbol: '', description: '' }];
                    updateBlock(block.id, block.content, { ...block.properties, legend: newLegend });
                  }}
                >
                  Add Legend Item
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Description:</p>
              <Textarea
                value={block.properties?.description || ''}
                onChange={e => updateBlock(
                  block.id, 
                  block.content, 
                  { ...block.properties, description: e.target.value }
                )}
                placeholder="Enter equation description"
                className="min-h-[100px]"
              />
            </div>
          </div>
        );

      default:
        return (
          <Textarea
            value={block.content}
            onChange={e => updateBlock(block.id, e.target.value)}
            placeholder="Enter text"
          />
        );
    }
  };

  const renderPreviewBlock = (block: ContentBlock) => {
    switch (block.type) {
      case 'header1':
        return (
          <h1 className="text-4xl font-bold mb-4">
            {renderFormattedContent(block.content)}
          </h1>
        );
      
      case 'header2':
        return (
          <h2 className="text-3xl font-semibold mb-3">
            {renderFormattedContent(block.content)}
          </h2>
        );

      case 'header3':
        return (
          <h3 className="text-2xl font-medium mb-2">
            {renderFormattedContent(block.content)}
          </h3>
        );

      case 'header4':
        return (
          <h4 className="text-xl font-medium mb-2">
            {renderFormattedContent(block.content)}
          </h4>
        );

      case 'paragraph':
        return (
          <p className="text-neutral-700 leading-relaxed mb-4">
            {renderFormattedContent(block.content)}
          </p>
        );

      case 'equationWithLabel':
        return (
          <div className="my-2">
            <div className="rounded-lg">
              <div className="flex flex-col items-center">
                <div>
                  <Math
                    block
                    math={block.content}
                    label={block.properties?.label}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'quote':
        return (
          <blockquote className="border-l-4 border-[rgb(43,154,154)] pl-4 my-8">
            <p className="text-xl italic text-neutral-600">
              {renderFormattedContent(block.content)}
            </p>
            {block.properties?.author && (
              <footer className="text-sm text-neutral-500 mt-2">
                — {block.properties.author}
              </footer>
            )}
          </blockquote>
        );

      case 'code':
        return (
          <div className="mb-8">
            <h3 className="text-2xl font-medium mb-3">Code Example</h3>
            <pre className="bg-neutral-50 p-4 rounded-lg overflow-x-auto">
              <code className={`text-sm ${block.properties?.language || ''}`}>
                {block.content}
              </code>
            </pre>
          </div>
        );

      case 'image':
        return (
          <div className="mb-8">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-neutral-100">
              <img
                src={block.content}
                alt={block.properties?.alt}
                className="object-cover w-full h-full"
              />
            </div>
            {block.properties?.alt && (
              <p className="text-sm text-neutral-500 mt-2">
                {renderFormattedContent(block.properties.alt)}
              </p>
            )}
          </div>
        );

      case 'video':
        return (
          <div className="mb-8">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={getYouTubeEmbedUrl(block.content)}
                title="Video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            {block.properties?.description && (
              <p className="text-sm text-neutral-500 mt-2">
                {renderFormattedContent(block.properties.description)}
              </p>
            )}
          </div>
        );

      case 'orderedList':
        return (
          <ol className="list-decimal pl-6 space-y-1 text-neutral-700 leading-relaxed mb-4">
            {block.content.split('\n').map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        );

      case 'unorderedList':
        return (
          <ul className="list-disc pl-6 space-y-1 text-neutral-700 leading-relaxed mb-4">
            {block.content.split('\n').map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        );

      case 'equationSection':
        return (
          <div className="mb-8">
            <div className="bg-neutral-50 p-6 rounded-lg">
              <div className="flex flex-col items-center space-y-4">
                <div className="">
                  <Math
                    block
                    math={block.content}
                    label={block.properties?.label}
                  />
                </div>

                {block.properties?.legend && block.properties.legend.length > 0 && (
                  <div className="text-sm text-neutral-600 mt-4 space-y-1 w-full">
                    <p>where:</p>
                    <ul className="list-none space-y-2">
                      {block.properties.legend.map((item, index) => (
                        <li key={index}>
                          <Math math={item.symbol} /> = {item.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {block.properties?.description && (
                  <div className="text-sm text-neutral-700 mt-4 border-t pt-4 w-full">
                    <p>{block.properties.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(post.blocks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPost(prev => ({
      ...prev,
      blocks: items
    }));
  };

  const generateComponentCode = (componentName: string) => {
    // Helper function to convert block to JSX string
    const blockToJSX = (block: ContentBlock): string => {
      switch (block.type) {
        case 'header1':
          return `<h1 className="text-4xl font-bold mb-4">${block.content}</h1>`;
        
        case 'header2':
          return `<h2 className="text-3xl font-semibold mb-3">${block.content}</h2>`;

        case 'header3':
          return `<h3 className="text-2xl font-medium mb-2">${block.content}</h3>`;

        case 'paragraph':
          return `<p className="text-neutral-700 leading-relaxed mb-4">${block.content}</p>`;

        case 'equationWithLabel':
          return `
            <div className="my-2">
              <div className="rounded-lg">
                <div className="flex flex-col items-center">
                  <div>
                    <Math
                      block
                      math="${block.content}"
                      ${block.properties?.label ? `label="${block.properties.label}"` : ''}
                    />
                  </div>
                </div>
              </div>
            </div>`;

        case 'quote':
          return `
            <blockquote className="border-l-4 border-[rgb(43,154,154)] pl-4 my-8">
              <p className="text-xl italic text-neutral-600">${block.content}</p>
              ${block.properties?.author ? 
                `<footer className="text-sm text-neutral-500 mt-2">— ${block.properties.author}</footer>` 
                : ''}
            </blockquote>`;

        case 'code':
          return `
            <div className="mb-8">
              <pre className="bg-neutral-50 p-4 rounded-lg overflow-x-auto">
                <code className="${block.properties?.language || ''}">${block.content}</code>
              </pre>
            </div>`;

        case 'image':
          return `
            <div className="mb-8">
              <div className="relative aspect-video rounded-lg overflow-hidden bg-neutral-100">
                <img
                  src="${block.content}"
                  alt="${block.properties?.alt || ''}"
                  className="object-cover w-full h-full"
                />
              </div>
              ${block.properties?.alt ? 
                `<p className="text-sm text-neutral-500 mt-2">${block.properties.alt}</p>` 
                : ''}
            </div>`;

        case 'video':
          return `
            <div className="mb-8">
              <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="${getYouTubeEmbedUrl(block.content)}"
                  title="Video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              ${block.properties?.description ? 
                `<p className="text-sm text-neutral-500 mt-2">${block.properties.description}</p>` 
                : ''}
            </div>`;

        case 'orderedList':
          return `
            <ol className="list-decimal pl-6 space-y-1 text-neutral-700 leading-relaxed mb-4">
              ${block.content.split('\n').map(item => `<li>${item}</li>`).join('\n              ')}
            </ol>`;

        case 'unorderedList':
          return `
            <ul className="list-disc pl-6 space-y-1 text-neutral-700 leading-relaxed mb-4">
              ${block.content.split('\n').map(item => `<li>${item}</li>`).join('\n              ')}
            </ul>`;

        case 'equationSection':
          return `
            <div className="mb-8">
              <div className="bg-neutral-50 p-6 rounded-lg">
                <div className="flex flex-col items-center space-y-4">
                  <div className="text-xl">
                    <Math
                      block
                      math="${block.content}"
                      ${block.properties?.label ? `label="${block.properties.label}"` : ''}
                    />
                  </div>
                  ${block.properties?.legend && block.properties.legend.length > 0 ? `
                  <div className="text-sm text-neutral-600 mt-4 space-y-1 w-full">
                    <p>where:</p>
                    <ul className="list-none space-y-2">
                      ${block.properties.legend.map(item => 
                        `<li><Math math="${item.symbol}" /> = ${item.description}</li>`
                      ).join('\n                    ')}
                    </ul>
                  </div>` : ''}
                  ${block.properties?.description ? `
                  <div className="text-sm text-neutral-700 mt-4 border-t pt-4 w-full">
                    <p>${block.properties.description}</p>
                  </div>` : ''}
                </div>
              </div>
            </div>`;

        default:
          return '';
      }
    };

    return `import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { Math } from '@/components/Math';

export default function ${componentName}() {
  const navigate = useNavigate();

  return (
    <PageLayout
      title="${post.title}"
      description="${post.description}"
      subtitle="Back to Blog"
      badge="${post.category}"
      date="${post.date}"
      tags={${JSON.stringify(post.tags)}}
      onBack={() => navigate('/blog')}
    >
      <article className="prose prose-lg mx-auto">
        <div className="mt-8">
          ${post.blocks.map(block => blockToJSX(block)).join('\n          ')}
        </div>
      </article>
    </PageLayout>
  );
}`;
  };

  const handlePublish = () => {
    if (!post.title) {
      toast.error("Please add a title before publishing");
      return;
    }

    const safeComponentName = getComponentName(post.title);
    if (!safeComponentName) {
      toast.error("Could not generate a valid component name from title");
      return;
    }

    // Create file content
    const fileContent = generateComponentCode(safeComponentName);

    // Create blob and download link
    const blob = new Blob([fileContent], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${safeComponentName}.tsx`;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Show success message
    toast.success("Component file downloaded successfully");
  };

  // Helper to convert title to valid component name
  const getComponentName = (title: string) => {
    return title
      .replace(/[^a-zA-Z0-9\s]/g, '') // Remove special characters
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join('');
  };

  const handleLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target.result as string;
        
        // Extract metadata from the component
        const titleMatch = content.match(/title="([^"]+)"/);
        const descriptionMatch = content.match(/description="([^"]+)"/);
        const categoryMatch = content.match(/badge="([^"]+)"/);
        const dateMatch = content.match(/date="([^"]+)"/);
        const tagsMatch = content.match(/tags=\{(\[[^\]]+\])\}/);

        // Update post state with extracted metadata
        setPost(prev => ({
          ...prev,
          title: titleMatch?.[1] || '',
          description: descriptionMatch?.[1] || '',
          category: categoryMatch?.[1] || '',
          date: dateMatch?.[1] || new Date().toISOString().split('T')[0],
          tags: tagsMatch ? JSON.parse(tagsMatch[1].replace(/'/g, '"')) : [],
          blocks: [] // You'll need to implement block parsing
        }));

        toast.success("Component loaded successfully");
      } catch (error) {
        toast.error("Error loading component");
        console.error(error);
      }
    };
    reader.readAsText(file);
  };

  if (isPreviewMode) {
    return (
      <PageLayout
        title={post.title || 'Untitled Post'}
        subtitle="Back to Editor"
        description={post.description}
        badge={post.category}
        date={post.date}
        tags={post.tags}
        onBack={() => setIsPreviewMode(false)}
        headerExtra={
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className="text-[rgb(43,154,154)] border-[rgb(43,154,154)] hover:bg-[rgb(43,154,154)]/10"
            >
              <Eye className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="outline"
              onClick={() => document.getElementById('file-input')?.click()}
              className="text-[rgb(43,154,154)] border-[rgb(43,154,154)] hover:bg-[rgb(43,154,154)]/10"
            >
              <Upload className="w-4 h-4 mr-2" />
              Load
            </Button>
            <input
              id="file-input"
              type="file"
              accept=".tsx"
              onChange={handleLoad}
              className="hidden"
            />
            <Button 
              onClick={handlePublish}
              className="bg-[rgb(43,154,154)] hover:bg-[rgb(43,154,154)]/90"
            >
              Publish
            </Button>
          </div>
        }
      >
        <article className="prose prose-lg mx-auto">
          <div className="mt-8">
            {post.blocks.map((block) => (
              <div key={block.id}>
                {renderPreviewBlock(block)}
              </div>
            ))}
          </div>
        </article>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title="Create New Blog Post"
      subtitle="Back to Blog"
      description="Build your blog post"
      badge="Editor"
      onBack={() => navigate('/blog')}
      headerExtra={
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className="text-[rgb(43,154,154)] border-[rgb(43,154,154)] hover:bg-[rgb(43,154,154)]/10"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button
            variant="outline"
            onClick={() => document.getElementById('file-input')?.click()}
            className="text-[rgb(43,154,154)] border-[rgb(43,154,154)] hover:bg-[rgb(43,154,154)]/10"
          >
            <Upload className="w-4 h-4 mr-2" />
            Load
          </Button>
          <input
            id="file-input"
            type="file"
            accept=".tsx"
            onChange={handleLoad}
            className="hidden"
          />
          <Button 
            onClick={handlePublish}
            className="bg-[rgb(43,154,154)] hover:bg-[rgb(43,154,154)]/90"
          >
            Publish
          </Button>
        </div>
      }
    >
      
        {/* Metadata Section */}
        <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm mb-4">
          <Input
            placeholder="Post Title"
            value={post.title}
            onChange={e => setPost(prev => ({ ...prev, title: e.target.value }))}
            className="text-2xl font-bold"
          />
          
          <Textarea
            placeholder="Post Description"
            value={post.description}
            onChange={e => setPost(prev => ({ ...prev, description: e.target.value }))}
            className="h-24"
          />

          <div className="flex gap-4">
            <Input
              placeholder="Category"
              value={post.category}
              onChange={e => setPost(prev => ({ ...prev, category: e.target.value }))}
            />
            <Input
              type="date"
              value={post.date}
              onChange={e => setPost(prev => ({ ...prev, date: e.target.value }))}
            />
          </div>

          {/* Tags Section */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                placeholder="Add tag"
                value={newTag}
                onChange={e => setNewTag(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleAddTag()}
              />
              <Button onClick={handleAddTag}>Add Tag</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="bg-[rgb(43,154,154)]/10 text-[rgb(43,154,154)] hover:bg-[rgb(43,154,154)]/20 cursor-pointer"
                  onClick={() => handleRemoveTag(tag)}
                >
                  {tag} ×
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Blocks Section */}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="blocks">
            {(provided) => (
              <div 
                className="space-y-4"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {post.blocks.map((block, index) => (
                  <Draggable 
                    key={block.id} 
                    draggableId={block.id} 
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`group relative flex gap-2 p-4 bg-white rounded-lg shadow-sm
                          ${snapshot.isDragging ? 'shadow-lg ring-2 ring-neutral-200' : ''}`}
                      >
                        <div
                          {...provided.dragHandleProps}
                          className="opacity-20 group-hover:opacity-100 cursor-grab active:cursor-grabbing"
                        >
                          <GripVertical className="w-4 h-4" />
                        </div>
                        <div className="flex-grow">
                          {renderBlockEditor(block)}
                        </div>
                        <button 
                          onClick={() => removeBlock(block.id)}
                          className="opacity-0 group-hover:opacity-100"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {/* Add Block Button */}
        <div className="flex justify-center">
          <Button
            onClick={() => setIsAddMenuOpen(true)}
            aria-expanded={isAddMenuOpen}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Block
          </Button>
        </div>

        <Dialog open={isAddMenuOpen} onOpenChange={setIsAddMenuOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add Content Block</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-3 gap-3 p-6">
              {blockTypes.map(({ type, label }) => (
                <Button
                  key={type}
                  variant="outline"
                  className="justify-start h-12 px-4 hover:bg-[rgb(43,154,154)]/10 hover:text-[rgb(43,154,154)] hover:border-[rgb(43,154,154)] transition-colors"
                  onClick={() => handleAddBlock(type)}
                >
                  {label}
                </Button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
    </PageLayout>
  );
} 