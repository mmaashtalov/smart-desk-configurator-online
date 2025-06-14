import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Calendar, MapPin, Users } from 'lucide-react';
import { projects } from '@/data/projects';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

const Projects = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-neutral">
        {/* Hero Section */}
        <section className="bg-primary text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6">
                Наши проекты
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Реализованные решения для офисов, коворкингов и домашних рабочих пространств
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-accent mb-2">50+</div>
                <div className="text-gray-600">Реализованных проектов</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent mb-2">500+</div>
                <div className="text-gray-600">Установленных столов</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent mb-2">15</div>
                <div className="text-gray-600">Городов России</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent mb-2">98%</div>
                <div className="text-gray-600">Довольных клиентов</div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Link to={`/projects/${project.id}`} key={project.id} className="group">
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="relative">
                      <ImageWithFallback 
                        src={project.image} 
                        alt={project.title}
                        className="w-full aspect-video h-auto object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="bg-white/90">
                          {project.tags[0]}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <p className="text-gray-600 text-sm">{project.description}</p>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{project.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{project.date}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Users className="h-4 w-4" />
                        <span>{project.employees}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="pt-2">
                        <h4 className="font-medium text-sm mb-2">Ключевые особенности:</h4>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {project.features.map((feature, index) => (
                            <li key={index} className="flex items-center space-x-2">
                              <div className="w-1 h-1 bg-accent rounded-full"></div>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <Button variant="outline" className="w-full mt-4">
                        <ExternalLink className="h-4 w-4 mr-2 group-hover:translate-x-1 transition" />
                        Подробнее
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-playfair text-3xl font-bold mb-6">
              Готовы обсудить ваш проект?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Мы поможем создать идеальное рабочее пространство для вашей команды
            </p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white">
              Связаться с нами
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Projects;
