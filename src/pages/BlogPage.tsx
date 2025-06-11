import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// This type should be shared
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  featuredImage: string;
  createdAt: string;
  // A short excerpt of the content
  excerpt: string; 
}

export const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/seo/blog-posts')
      .then(res => res.json())
      .then(data => {
        // Create excerpts for display
        const postsWithExcerpts = data.map(post => ({
          ...post,
          excerpt: post.content.substring(0, 150).replace(/<[^>]+>/g, '') + '...'
        }));
        setPosts(postsWithExcerpts);
        setLoading(false);
      })
      .catch(() => {
        console.error('Failed to load posts.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-10">Loading posts...</div>;

  return (
    <div className="container mx-auto py-12 px-4">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Наш Блог</h1>
        <p className="mt-2 text-lg text-gray-600">
          Последние новости, статьи и инсайты от нашей команды.
        </p>
      </header>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <Link to={`/blog/${post.slug}`} key={post.id}>
            <Card className="h-full hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <img 
                src={post.featuredImage} 
                alt={post.title} 
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <p className="text-sm text-gray-500 pt-2">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{post.excerpt}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}; 