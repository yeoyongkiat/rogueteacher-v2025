import { useState } from "react";
import Layout from "../components/Layout";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { X } from "lucide-react";

const CATEGORIES = ["EdTech", "HealthTech", "Public Service", "Technology", "Career", "Leadership"];

export default function BlogEditor() {
  const [frontmatter, setFrontmatter] = useState({
    title: "",
    date: new Date().toISOString().split('T')[0],
    category: "",
    tags: [] as string[],
    summary: "",
    isOldArticle: false
  });
  const [content, setContent] = useState("");
  const [newTag, setNewTag] = useState("");

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTag.trim()) {
      setFrontmatter(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFrontmatter(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const generateMarkdown = () => {
    const fm = {
      ...frontmatter,
      tags: JSON.stringify(frontmatter.tags)
    };
    
    return `---
title: "${fm.title}"
date: "${fm.date}"
category: "${fm.category}"
tags: ${fm.tags}
summary: "${fm.summary}"
isOldArticle: ${fm.isOldArticle}
---

${content}`;
  };

  const handleSave = () => {
    const markdown = generateMarkdown();
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const slug = frontmatter.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    a.href = url;
    a.download = `${slug}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <section className="section-padding bg-[#f6f6f6] min-h-screen">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-semibold mb-8">Blog Editor</h1>

            {/* Frontmatter Editor */}
            <div className="bg-white rounded-xl p-6 mb-8 shadow-md">
              <h2 className="text-xl font-semibold mb-4">Article Metadata</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={frontmatter.title}
                      onChange={e => setFrontmatter(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Article title..."
                    />
                  </div>

                  <div>
                    <Label>Date</Label>
                    <Input
                      type="date"
                      value={frontmatter.date}
                      onChange={e => setFrontmatter(prev => ({ ...prev, date: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label>Category</Label>
                    <Select
                      value={frontmatter.category}
                      onValueChange={value => setFrontmatter(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Summary</Label>
                    <Input
                      value={frontmatter.summary}
                      onChange={e => setFrontmatter(prev => ({ ...prev, summary: e.target.value }))}
                      placeholder="Brief summary of the article..."
                    />
                  </div>

                  <div>
                    <Label>Tags</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {frontmatter.tags.map(tag => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-neutral-100 
                            rounded-full text-sm"
                        >
                          {tag}
                          <button
                            onClick={() => handleRemoveTag(tag)}
                            className="text-neutral-400 hover:text-neutral-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                    <Input
                      value={newTag}
                      onChange={e => setNewTag(e.target.value)}
                      onKeyDown={handleAddTag}
                      placeholder="Add tag and press Enter..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Markdown Editor */}
            <div className="bg-white rounded-xl p-6 shadow-md mb-8">
              <h2 className="text-xl font-semibold mb-4">Content</h2>
              <div data-color-mode="light">
                <MDEditor
                  value={content}
                  onChange={value => setContent(value || '')}
                  preview="live"
                  height={500}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => {
                  setFrontmatter({
                    title: "",
                    date: new Date().toISOString().split('T')[0],
                    category: "",
                    tags: [],
                    summary: "",
                    isOldArticle: false
                  });
                  setContent("");
                }}
              >
                Clear
              </Button>
              <Button onClick={handleSave}>
                Save as Markdown
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
} 