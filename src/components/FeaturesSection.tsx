
import { Settings, Zap, Shield, Award, ArrowRight } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Settings,
      title: "Электрическая регулировка",
      description: "Плавная регулировка высоты от 65 до 125 см с памятью позиций",
      details: "4 позиции памяти"
    },
    {
      icon: Zap,
      title: "Беспроводная зарядка",
      description: "Встроенная беспроводная зарядка Qi для смартфонов",
      details: "15W быстрая зарядка"
    },
    {
      icon: Shield,
      title: "Натуральные материалы",
      description: "Дубовый шпон 18 мм с масляным покрытием в трёх тонах",
      details: "100% экологично"
    },
    {
      icon: Award,
      title: "Гарантия качества",
      description: "5 лет гарантии на электрическую систему, 10 лет на столешницу",
      details: "Премиум качество"
    }
  ];

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
              <div className="relative mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 gradient-accent rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <ArrowRight className="h-3 w-3 text-white transform group-hover:translate-x-1 transition-transform duration-300" />
                </div>
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
              <button className="btn-primary">
                Получить консультацию
              </button>
              <button className="btn-secondary">
                Посмотреть каталог
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
