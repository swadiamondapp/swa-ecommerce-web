//src/app/vlog/page.js
'use client';
import { useEffect, useState } from 'react';

export default function VlogPage() {
  const [content, setContent] = useState('<p>Loading...</p>');

  useEffect(() => {
    async function loadBlog() {
      try {
        const res = await fetch('/api/vlog-proxy');
        const html = await res.text();
        setContent(html);
      } catch {
        setContent('<p>Error loading blog.</p>');
      }
    }
    loadBlog();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
