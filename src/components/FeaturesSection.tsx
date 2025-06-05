
import { Settings, Zap, Shield, Award } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Settings,
      title: "Электрическая регулировка",
      description: "Плавная регулировка высоты от 65 до 125 см с памятью позиций"
    },
    {
      icon: Zap,
      title: "Беспроводная зарядка",
      description: "Встроенная беспроводная зарядка Qi для смартфонов"
    },
    {
      icon: Shield,
      title: "Натуральные материалы",
      description: "Дубовый шпон 18 мм с масляным покрытием в трёх тонах"
    },
    {
      icon: Award,
      title: "Гарантия качества",
      description: "5 лет гарантии на электрическую систему, 10 лет на столешницу"
    }
  ];

  return (
    <section className="py-20 bg-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-primary mb-4">
            Почему выбирают наши столы
          </h2>
          <p className="font-roboto text-lg text-gray-600 max-w-2xl mx-auto">
            Каждый стол создается с вниманием к деталям и заботой о вашем комфорте
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center group hover-scale cursor-pointer"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-6 group-hover:shadow-xl transition-all duration-300 group-hover:bg-accent">
                <feature.icon className="h-8 w-8 text-primary group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-roboto font-semibold text-xl text-primary mb-3">
                {feature.title}
              </h3>
              <p className="font-roboto text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
