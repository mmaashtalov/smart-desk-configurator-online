import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// This type should be shared
interface BlogPost {
  title: string;
  content: string;
  featuredImage: string;
  createdAt: string;
  author: string;
}

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch by slug. Here we simulate it by fetching all and finding.
    fetch('/api/seo/blog-posts')
      .then(res => res.json())
      .then(data => {
        const foundPost = data.find(p => p.slug === slug);
        setPost(foundPost);
        setLoading(false);
      })
      .catch(() => {
        console.error('Failed to load post.');
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="text-center py-10">Loading post...</div>;
  if (!post) return <div className="text-center py-10">Post not found.</div>;

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <article>
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">{post.title}</h1>
          <div className="text-gray-500 text-sm">
            <span>By {post.author}</span> &middot; <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
        </header>
        
        <img 
          src={post.featuredImage} 
          alt={post.title}
          className="w-full h-auto object-cover rounded-lg mb-8"
        />

        <div 
          className="prose lg:prose-xl max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
      </article>
    </div>
  );
}; 