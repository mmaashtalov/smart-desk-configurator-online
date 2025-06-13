import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Users, Award, Target } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <CheckCircle className="h-6 w-6 text-accent" />,
      title: "Качество",
      description: "Используем только премиальные материалы и современные технологии"
    },
    {
      icon: <Users className="h-6 w-6 text-accent" />,
      title: "Клиентоориентированность", 
      description: "Индивидуальный подход к каждому клиенту и проекту"
    },
    {
      icon: <Award className="h-6 w-6 text-accent" />,
      title: "Инновации",
      description: "Внедряем передовые решения в сфере умной мебели"
    },
    {
      icon: <Target className="h-6 w-6 text-accent" />,
      title: "Надежность",
      description: "Гарантируем долговечность и стабильную работу наших изделий"
    }
  ];

  const team = [
    {
      name: "Алексей Петров",
      position: "Генеральный директор",
      experience: "15+ лет в мебельной индустрии"
    },
    {
      name: "Мария Сидорова", 
      position: "Главный дизайнер",
      experience: "10+ лет в промышленном дизайне"
    },
    {
      name: "Дмитрий Козлов",
      position: "Технический директор", 
      experience: "12+ лет в автоматизации"
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
                О компании
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Мы создаем премиальную умную мебель, которая объединяет традиционное мастерство с современными технологиями
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-playfair text-3xl font-bold mb-6">Наша история</h2>
                <p className="text-gray-600 mb-6">
                  Офис Интеллект была основана в 2018 году с простой идеей: создавать мебель, которая не просто красива, 
                  но и умна. Мы начинали как небольшая мастерская, специализирующаяся на изготовлении столов из массива дуба.
                </p>
                <p className="text-gray-600 mb-6">
                  Сегодня мы — ведущий производитель умных столов с электроприводом, который объединяет традиционные 
                  столярные техники с передовыми технологиями автоматизации.
                </p>
                <div className="flex space-x-4">
                  <Badge variant="secondary" className="text-sm">6+ лет на рынке</Badge>
                  <Badge variant="secondary" className="text-sm">500+ довольных клиентов</Badge>
                  <Badge variant="secondary" className="text-sm">50+ проектов</Badge>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80" 
                  alt="Мастерская" 
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-playfair text-3xl font-bold mb-4">Наши ценности</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Принципы, которыми мы руководствуемся в работе и которые помогают нам создавать исключительные продукты
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      {value.icon}
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-playfair text-3xl font-bold mb-4">Наша команда</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Профессионалы своего дела, которые воплощают в жизнь самые смелые идеи
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="w-24 h-24 bg-wood-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-12 w-12 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <p className="text-accent font-medium">{member.position}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{member.experience}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;
