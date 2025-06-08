
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Award, Gem } from 'lucide-react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Исключительность",
      subtitle: "в каждой детали",
      description: "Премиальные умные столы из редких пород дуба с инновационными технологиями для тех, кто ценит совершенство",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80",
      features: ["Ручная работа", "Редкие материалы", "Инновации"]
    },
    {
      id: 2,
      title: "Мастерство",
      subtitle: "передается поколениями",
      description: "Каждый стол создается вручную мастерами с многолетним опытом, используя технологии будущего",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80",
      features: ["Эксклюзивность", "Безупречность", "Вечность"]
    },
    {
      id: 3,
      title: "Индивидуальность",
      subtitle: "для избранных",
      description: "Создайте уникальный стол, который станет центром вашего пространства и отражением вашего статуса",
      image: "https://images.unsplash.com/photo-1497366412874-3415097a27e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80",
      features: ["Персонализация", "Эксклюзивность", "Престиж"]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-screen overflow-hidden hero-luxury">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-2000 ease-out ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-luxury-black/60 via-luxury-black/40 to-luxury-black/80" />
        </div>
      ))}

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-1 h-32 bg-luxury-gold opacity-30 animate-float" />
      <div className="absolute bottom-32 left-16 w-16 h-1 bg-luxury-gold opacity-40" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 w-full">
          <div className="max-w-4xl">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`transition-all duration-1000 ${
                  index === currentSlide
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
              >
                {index === currentSlide && (
                  <>
                    {/* Badge */}
                    <div className="flex items-center gap-3 mb-8 luxury-reveal">
                      <Gem className="h-5 w-5 text-luxury-gold" />
                      <span className="luxury-caption text-luxury-gold">
                        Эксклюзивная коллекция 2024
                      </span>
                    </div>

                    <h1 className="luxury-heading text-luxury-white mb-6 luxury-reveal" style={{animationDelay: '200ms'}}>
                      {slide.title}
                    </h1>
                    
                    <h2 className="font-playfair text-3xl md:text-5xl text-luxury-gold mb-8 luxury-reveal" style={{animationDelay: '400ms'}}>
                      {slide.subtitle}
                    </h2>
                    
                    <p className="luxury-body text-luxury-white/90 text-xl md:text-2xl mb-8 max-w-3xl luxury-reveal" style={{animationDelay: '600ms'}}>
                      {slide.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-6 mb-12 luxury-reveal" style={{animationDelay: '800ms'}}>
                      {slide.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-luxury-gold fill-current" />
                          <span className="text-luxury-white/80 font-inter font-medium">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 luxury-reveal" style={{animationDelay: '1000ms'}}>
                      <Link to="/catalog">
                        <Button className="luxury-button-gold group">
                          Исследовать коллекцию
                          <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                      <Link to="/configurator">
                        <Button className="luxury-button-outline">
                          Создать уникальный
                        </Button>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Awards/Certifications */}
      <div className="absolute bottom-8 left-8 flex items-center gap-8 text-luxury-white/60">
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5" />
          <span className="text-sm font-inter">Премия дизайна 2024</span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 fill-current" />
          <span className="text-sm font-inter">Сертификат качества</span>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-0.5 transition-all duration-500 ${
              index === currentSlide
                ? 'bg-luxury-gold w-12'
                : 'bg-luxury-white/30 hover:bg-luxury-white/50 w-6'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 text-luxury-white/60 animate-bounce">
        <div className="flex flex-col items-center space-y-3">
          <span className="text-xs font-inter tracking-wider uppercase">Листайте</span>
          <div className="w-px h-12 bg-gradient-to-b from-luxury-white/60 to-transparent" />
        </div>
      </div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 shimmer opacity-20 pointer-events-none" />
    </section>
  );
};

export default HeroSection;
