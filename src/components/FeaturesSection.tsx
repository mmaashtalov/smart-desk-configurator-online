import { Settings, Zap, Shield, Award, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ConsultationDialog } from '@/components/ConsultationDialog';

const initialFeatures = [
  {
    icon: Settings,
    title: "Электрическая регулировка",
    description: "Плавная регулировка высоты от 65 до 125 см с памятью позиций",
    details: "4 позиции памяти",
    images: [
      "/images/features/electric-lift.webp"
    ]
  },
  {
    icon: Zap,
    title: "Беспроводная зарядка",
    description: "Встроенная беспроводная зарядка Qi для смартфонов",
    details: "15W быстрая зарядка",
    images: [
      "/images/features/qi-charger.webp"
    ]
  },
  {
    icon: Shield,
    title: "Натуральные материалы",
    description: "Дубовый шпон 18 мм с масляным покрытием в трёх тонах",
    details: "100% экологично",
    images: [
      "/images/features/oak-veneer.webp"
    ]
  },
  {
    icon: Award,
    title: "Гарантия качества",
    description: "5 лет гарантии на электрическую систему, 10 лет на столешницу",
    details: "Премиум качество",
    images: [
      "/images/features/quality-control.webp"
    ]
  }
];

const FeaturesSection = () => {
  const [features] = useState(initialFeatures);
  const [isDialogOpen, setDialogOpen] = useState(false);

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Award className="h-4 w-4" />
            Преимущества
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
            Почему выбирают 
            <span className="text-gradient block">наши столы</span>
          </h2>
          <p className="font-roboto text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Каждый стол создается с вниманием к деталям и заботой о вашем комфорте. 
            Мы используем только лучшие материалы и передовые технологии.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card group cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative mb-6 h-64">
                <img 
                  src={feature.images[0]}
                  alt={feature.title} 
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              
              <div className="space-y-3">
                <div className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full">
                  {feature.details}
                </div>
                <h3 className="font-playfair font-bold text-xl text-primary leading-tight">
                  {feature.title}
                </h3>
                <p className="font-roboto text-gray-600 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>

              <div className="mt-6 flex items-center text-accent text-sm font-semibold group-hover:gap-2 transition-all duration-300">
                Подробнее
                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA секция */}
        <div className="mt-20 text-center">
          <div className="bg-white rounded-3xl p-12 modern-shadow-lg max-w-4xl mx-auto">
            <h3 className="font-playfair text-3xl font-bold text-primary mb-4">
              Готовы создать идеальное рабочее место?
            </h3>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Наши эксперты помогут подобрать и настроить умный стол под ваши потребности
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => setDialogOpen(true)}>
                Получить консультацию
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/projects">Посмотреть каталог</Link>
              </Button>
            </div>
          </div>
        </div>
        <ConsultationDialog open={isDialogOpen} onOpenChange={setDialogOpen} />
      </div>
    </section>
  );
};

export default FeaturesSection;
