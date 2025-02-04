import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { Math } from '@/components/Math';

export default function testcomponent.tsx() {
  const navigate = useNavigate();

  return (
    <PageLayout
      title="Post Title"
      description="Post Description"
      subtitle="Back to Blog"
      badge="Category"
      date="2025-02-04"
      tags={["ddd","aaa"]}
      onBack={() => navigate('/blog')}
    >
      <article className="prose prose-lg mx-auto">
        <div className="mt-8">
          <h1 className="text-4xl font-bold mb-4">asdasd</h1>
          <p className="text-neutral-700 leading-relaxed mb-4">asdasdas</p>
          
            <div className="my-2">
              <div className="rounded-lg">
                <div className="flex flex-col items-center">
                  <div>
                    <Math
                      block
                      math="a=a"
                      label="1a"
                    />
                  </div>
                </div>
              </div>
            </div>
          
            <div className="mb-8">
              <div className="bg-neutral-50 p-6 rounded-lg">
                <div className="flex flex-col items-center space-y-4">
                  <div className="text-xl">
                    <Math
                      block
                      math="aaa"
                      label="1b"
                    />
                  </div>
                  
                  <div className="text-sm text-neutral-600 mt-4 space-y-1 w-full">
                    <p>where:</p>
                    <ul className="list-none space-y-2">
                      <li><Math math="s" /> = ssss</li>
                    </ul>
                  </div>
                  
                  <div className="text-sm text-neutral-700 mt-4 border-t pt-4 w-full">
                    <p>asdas</p>
                  </div>
                </div>
              </div>
            </div>
          
            <div className="mb-8">
              <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/YhzxlZrOSss"
                  title="Video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="text-sm text-neutral-500 mt-2">asdasda</p>
            </div>
        </div>
      </article>
    </PageLayout>
  );
}