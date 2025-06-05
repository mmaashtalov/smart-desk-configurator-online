
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Премиальные умные столы",
      subtitle: "из дубового шпона с электроприводом",
      description: "Масляное покрытие в трёх тонах: Арктик, Сандал, Венге",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      cta: "Перейти к каталогу"
    },
    {
      id: 2,
      title: "Эргономика и технологии",
      subtitle: "в каждой детали",
      description: "Регулировка высоты, беспроводная зарядка, умное управление",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      cta: "Конфигуратор"
    },
    {
      id: 3,
      title: "Индивидуальный подход",
      subtitle: "к каждому проекту",
      description: "Создайте свой идеальный рабочий стол с помощью конфигуратора",
      image: "https://images.unsplash.com/photo-1497366412874-3415097a27e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      cta: "Оставить заявку"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`transition-all duration-700 ${
                  index === currentSlide
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
              >
                {index === currentSlide && (
                  <>
                    <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 animate-fade-in-up">
                      {slide.title}
                    </h1>
                    <h2 className="font-playfair text-2xl md:text-3xl lg:text-4xl text-accent mb-6 animate-fade-in-up animation-delay-200">
                      {slide.subtitle}
                    </h2>
                    <p className="font-roboto text-lg md:text-xl text-gray-200 mb-8 max-w-2xl animate-fade-in-up animation-delay-400">
                      {slide.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-600">
                      <Link to="/catalog">
                        <Button size="lg" className="config-button group">
                          {slide.cta}
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                      <Link to="/configurator">
                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                          Конфигуратор
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

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-accent scale-125'
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 text-white animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm font-roboto">Scroll</span>
          <div className="w-0.5 h-8 bg-white/50" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
