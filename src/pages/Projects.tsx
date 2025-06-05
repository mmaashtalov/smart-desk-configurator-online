
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Calendar, MapPin, Users } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Офис IT-компании TechFlow",
      description: "Комплексное оснащение офиса умными столами с электроприводом для 50 сотрудников",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
      location: "Москва",
      date: "Декабрь 2023",
      employees: "50 человек",
      tags: ["Корпоративный", "IT", "Большой проект"],
      features: ["Умные столы", "Беспроводная зарядка", "USB-хабы", "Память позиций"]
    },
    {
      id: 2,
      title: "Коворкинг пространство WorkHub",
      description: "Создание гибкого рабочего пространства с регулируемыми столами",
      image: "https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=800&q=80",
      location: "Санкт-Петербург", 
      date: "Октябрь 2023",
      employees: "30 мест",
      tags: ["Коворкинг", "Стартапы", "Гибкость"],
      features: ["Быстрая настройка", "Общие зоны", "Мобильные тумбы", "Зарядные станции"]
    },
    {
      id: 3,
      title: "Домашний офис CEO",
      description: "Персональный кабинет руководителя с эксклюзивным дизайном",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
      location: "Москва",
      date: "Сентябрь 2023", 
      employees: "1 человек",
      tags: ["Премиум", "Индивидуальный", "Эксклюзив"],
      features: ["Массив дуба", "Встроенная подсветка", "Климат-контроль", "Умное управление"]
    },
    {
      id: 4,
      title: "Медицинский центр HealthCare+",
      description: "Рабочие места для врачей с учетом специфики медицинской деятельности",
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=800&q=80",
      location: "Екатеринбург",
      date: "Август 2023",
      employees: "25 врачей",
      tags: ["Медицина", "Эргономика", "Специализированное"],
      features: ["Антибактериальное покрытие", "Легкая очистка", "Тихий привод", "Память настроек"]
    },
    {
      id: 5,
      title: "Архитектурное бюро ArchiSpace",
      description: "Творческое пространство для архитекторов и дизайнеров",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80",
      location: "Новосибирск",
      date: "Июль 2023",
      employees: "15 специалистов",
      tags: ["Креатив", "Дизайн", "Архитектура"],
      features: ["Большие поверхности", "Интеграция с планшетами", "Подставки для чертежей", "Регулировка наклона"]
    },
    {
      id: 6,
      title: "Финансовая компания InvestPro",
      description: "Представительский офис с акцентом на статус и функциональность",
      image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80",
      location: "Москва",
      date: "Июнь 2023",
      employees: "40 сотрудников",
      tags: ["Финансы", "Представительский", "Статус"],
      features: ["Премиальные материалы", "Скрытая проводка", "Интеграция с AV-системами", "Безопасность"]
    }
  ];

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
                <Card key={project.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover"
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
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Подробнее
                    </Button>
                  </CardContent>
                </Card>
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
