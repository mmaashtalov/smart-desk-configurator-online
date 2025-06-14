import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// This type should be shared
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  featuredImage: string;
  createdAt: string;
  author: string;
}

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Showcase projects to promote our implemented smart furniture solutions
  const showcaseProjects = [
    {
      id: 1,
      title: 'Офис IT-компании TechFlow',
      description: 'Оснастили 50 рабочих мест умными столами с электроприводом',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      location: 'Москва',
      date: 'Декабрь 2023',
    },
    {
      id: 2,
      title: 'Коворкинг WorkHub',
      description: 'Гибкое пространство с регулируемыми столами для стартап-резидентов',
      image: 'https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=800&q=80',
      location: 'Санкт-Петербург',
      date: 'Октябрь 2023',
    },
    {
      id: 3,
      title: 'Домашний офис CEO',
      description: 'Персональный кабинет руководителя с эксклюзивным дизайном',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
      location: 'Москва',
      date: 'Сентябрь 2023',
    },
  ];

  useEffect(() => {
    // In a real app, you would fetch by slug. Here we simulate it by fetching all and finding.
    fetch('/api/seo/blog-posts')
      .then(res => res.json())
      .then((data: BlogPost[]) => {
        const foundPost = data.find(p => p.slug === slug);
        setPost(foundPost || null);
        // take up to 3 other posts as related
        const relatedPosts = data.filter(p => p.slug !== slug).slice(0, 3);
        setRelated(relatedPosts);
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
    <Layout>
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

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-semibold mb-6">Вам также может понравиться</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {related.map(r => (
                <Link to={`/blog/${r.slug}`} key={r.id} className="group">
                  <Card className="h-full flex flex-col hover-scale">
                    <img
                      src={r.featuredImage}
                      alt={r.title}
                      className="w-full aspect-video h-auto object-cover rounded-t-lg"
                    />
                    <CardHeader>
                      <CardTitle>{r.title}</CardTitle>
                      <p className="text-sm text-gray-500 pt-2">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </p>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <CardDescription>
                        {r.content.replace(/<[^>]+>/g, '').substring(0, 120)}...
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Showcase projects */}
        <section className="mt-24">
          <h2 className="text-2xl font-semibold mb-6">Обратите внимание!</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {showcaseProjects.map(p => (
              <Card key={p.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full aspect-video h-auto object-cover"
                />
                <CardHeader>
                  <CardTitle>{p.title}</CardTitle>
                  <p className="text-gray-600 text-sm mt-1">{p.description}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-gray-500">
                    {p.location} &middot; {p.date}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}; 