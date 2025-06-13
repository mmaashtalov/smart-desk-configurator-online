import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Award, Gem, PlusCircle, XCircle } from 'lucide-react'; // Добавлены PlusCircle и XCircle для кнопок
import { ProductImageSlider } from '@/components/ProductImageSlider';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([
    {
      id: 1,
      title: "Исключительность",
      subtitle: "в каждой детали",
      description: "Премиальные умные столы из редких пород дуба с инновационными технологиями для тех, кто ценит совершенство",
      images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80",
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80"
      ],
      features: ["Ручная работа", "Редкие материалы", "Инновации"]
    },
    {
      id: 2,
      title: "Мастерство",
      subtitle: "передается поколениями",
      description: "Каждый стол создается вручную мастерами с многолетним опытом, используя технологии будущего",
      images: [
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80"
      ],
      features: ["Эксклюзивность", "Безупречность", "Вечность"]
    },
    {
      id: 3,
      title: "Индивидуальность",
      subtitle: "для избранных",
      description: "Создайте уникальный стол, который станет центром вашего пространства и отражением вашего статуса",
      images: [
        "https://images.unsplash.com/photo-1497366412874-3415097a27e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80"
      ],
      features: ["Персонализация", "Эксклюзивность", "Престиж"]
    }
  ]);

  // Функции handleAddImage и handleDeleteImage теперь управляются ProductImageSlider
  // (Они были перемещены в ProductImageSlider для упрощения)
  // Но если HeroSection должен их вызывать напрямую (например, для кнопок вне слайдера),
  // то они должны принимать только imageUrl, а не productId.
  // В HeroSection они будут вызываться ProductImageSlider'ом, который передаст только imageUrl.

  const handleAddImage = (imageUrl: string) => {
    // В HeroSection мы добавляем изображение к текущему слайду
    setSlides(prevSlides =>
      prevSlides.map((slide, index) =>
        index === currentSlide
          ? { ...slide, images: [...slide.images, imageUrl] }
          : slide
      )
    );
  };

  const handleDeleteImage = (imageUrl: string) => {
    // В HeroSection мы удаляем изображение из текущего слайда
    setSlides(prevSlides =>
      prevSlides.map((slide, index) => {
        if (index === currentSlide) {
          if (slide.images.length <= 1) {
            alert("Нельзя удалить последнее изображение.");
            return slide;
          }
          const newImages = slide.images.filter(img => img !== imageUrl);
          return { ...slide, images: newImages };
        }
        return slide;
      })
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  if (!slide) {
    return null; // или какой-то индикатор загрузки
  }

  return (
    <section className="relative h-screen min-h-[700px] bg-luxury-black text-white overflow-hidden flex items-center justify-center">
      {/* Background Slider */}
      <ProductImageSlider
        images={slide.images}
        productName={slide.title}
        onAddImage={handleAddImage}
        onDeleteImage={handleDeleteImage}
        className="absolute inset-0 z-15 w-full h-full"
      />
      
      {/* Gradient Overlay (pointer-events-none, чтобы не блокировать клики) */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/80 z-10 pointer-events-none" />

      {/* Foreground Content */}
      <div className="relative z-20 h-full w-full flex flex-col justify-center items-center text-center p-4">
        <div className="max-w-4xl mx-auto">
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
            <Button asChild size="lg" className="bg-white text-black hover:bg-gray-200">
              <Link to="/configurator">
                Начать конфигурацию
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
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
            onClick={() => setCurrentSlide(index)}
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