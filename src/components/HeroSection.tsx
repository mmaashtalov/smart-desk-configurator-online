import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Award, Gem } from 'lucide-react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([
    {
      id: 1,
      imageUrl: '/images/heroslider/Lucid_Realism_Generate_a_highresolution_2400800_px_ultrarealis_0.jpg',
      title: 'Создавайте свой идеальный стол',
      description: 'Настройте каждый аспект, от материалов до функций.',
      buttonText: 'Начать конфигурацию',
      buttonLink: '/configurator',
      subtitle: "в каждой детали",
      features: ["Ручная работа", "Редкие материалы", "Инновации"]
    },
    {
      id: 2,
      imageUrl: "/images/heroslider/Lucid_Realism_Generate_a_highresolution_2400800_px_ultrarealis_0.jpg",
      title: "Мастерство",
      subtitle: "передается поколениями",
      description: "Каждый стол создается вручную мастерами с многолетним опытом, используя технологии будущего",
      buttonText: 'Начать конфигурацию',
      buttonLink: '/configurator',
      features: ["Эксклюзивность", "Безупречность", "Вечность"]
    },
    {
      id: 3,
      imageUrl: "/images/heroslider/Lucid_Realism_Generate_a_highresolution_2400800_px_ultrarealis_0.jpg",
      title: "Индивидуальность",
      subtitle: "для избранных",
      description: "Создайте уникальный стол, который станет центром вашего пространства и отражением вашего статуса",
      buttonText: 'Начать конфигурацию',
      buttonLink: '/configurator',
      features: ["Персонализация", "Эксклюзивность", "Престиж"]
    }
  ]);

  const autoplayTimerRef = useRef<number | null>(null);

  const resetAutoplayTimer = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }
    autoplayTimerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
  };

  useEffect(() => {
    resetAutoplayTimer();
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [slides.length]);

  const slide = slides[currentSlide];

  if (!slide) {
    return null;
  }

  return (
    <section className="relative h-screen min-h-[700px] bg-luxury-black text-white w-full">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-15 w-full h-full"
        style={{
          backgroundImage: `url(${slide.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Gradient Overlay (pointer-events-none, чтобы не блокировать клики) */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/80 z-10 pointer-events-none" />

      {/* Foreground Content */}
      <div className="relative z-20 h-full w-full absolute inset-0 flex flex-col justify-center items-center text-center p-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Top Info */}
          <div className="flex items-center gap-3 mb-4 text-luxury-gold">
              <Gem className="h-5 w-5" />
              <span className="text-sm font-inter uppercase tracking-wider">Эксклюзивная коллекция 2024</span>
          </div>

          {/* Main Title (H1) */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-none mb-4">
            {slide.title}
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-6">
            {slide.subtitle}
          </p>
          
          {/* Description */}
          <p className="max-w-2xl mx-auto text-gray-400 mb-8">
            {slide.description}
          </p>
          
          {/* Features List */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {slide.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-gray-300 font-medium">{feature}</span>
              </div>
            ))}
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" variant="accent">
              <Link to={slide.buttonLink}>
                {slide.buttonText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/catalog">
                Исследовать коллекцию
              </Link>
            </Button>
          </div>

        </div>
      </div>

      {/* Bottom slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSlide(index);
              resetAutoplayTimer(); // Reset timer on manual slide change
            }}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Перейти к слайду ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;