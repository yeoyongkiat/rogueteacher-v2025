import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Math } from '@/components/Math';

export default function testcomponent() {
  return (
    <PageLayout
      title="Post Title"
      description="Post Description"
      badge="Category"
      date="2025-02-04"
      tags={["Tag 1","Tag 2","Tag 3"]}
    >
      <article className="prose prose-lg mx-auto">
        <div className="mt-8">
          <h1 className="text-4xl font-bold mb-4">H1 Header</h1>
          <p className="text-neutral-700 leading-relaxed mb-4">So this is the first paragraph!</p>
          
            <div className="my-2">
              <div className="rounded-lg">
                <div className="flex flex-col items-center">
                  <div>
                    <Math
                      block
                      math="x = 1"
                      label="1a"
                    />
                  </div>
                </div>
              </div>
            </div>
          <p className="text-neutral-700 leading-relaxed mb-4">I want a few things</p>
          
            <ol className="list-decimal pl-6 space-y-1 text-neutral-700 leading-relaxed mb-4">
              <li>love</li>
              <li>life</li>
              <li>awesome</li>
            </ol>
          
            <div className="mb-8">
              <div className="bg-neutral-50 p-6 rounded-lg">
                <div className="flex flex-col items-center space-y-4">
                  <div className="text-xl">
                    <Math
                      block
                      math="x + b"
                      label="1b"
                    />
                  </div>
                  
                  <div className="text-sm text-neutral-600 mt-4 space-y-1 w-full">
                    <p>where:</p>
                    <ul className="list-none space-y-2">
                      <li><Math math="s" /> = assa</li>
                    <li><Math math="s" /> = ASsa</li>
                    </ul>
                  </div>
                  
                  <div className="text-sm text-neutral-700 mt-4 border-t pt-4 w-full">
                    <p>SAassA</p>
                  </div>
                </div>
              </div>
            </div>
          
            <blockquote className="border-l-4 border-[rgb(43,154,154)] pl-4 my-8">
              <p className="text-xl italic text-neutral-600">asdasdad</p>
              <footer className="text-sm text-neutral-500 mt-2">— asdasd</footer>
            </blockquote>
          
            <div className="mb-8">
              <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/WIBFnmY2YrA"
                  title="Video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="text-sm text-neutral-500 mt-2">asdasdasd</p>
            </div>
        </div>
      </article>
    </PageLayout>
  );
}