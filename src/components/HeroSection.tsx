import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Award, Gem, PlusCircle, XCircle } from 'lucide-react';
import { ProductImageSlider } from '@/components/ProductImageSlider';
import { ImageFormModal } from '@/components/ui/ImageFormModal';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'delete'>('add');
  const [slides, setSlides] = useState([
    {
      id: 1,
      title: "Исключительность",
      subtitle: "в каждой детали",
      description: "Премиальные умные столы из редких пород дуба с инновационными технологиями для тех, кто ценит совершенство",
      images: [
        "https://picsum.photos/seed/hero1/2400/800",
        "https://picsum.photos/seed/hero2/2400/800",
      ],
      features: ["Ручная работа", "Редкие материалы", "Инновации"]
    },
    {
      id: 2,
      title: "Мастерство",
      subtitle: "передается поколениями",
      description: "Каждый стол создается вручную мастерами с многолетним опытом, используя технологии будущего",
      images: [
        "https://picsum.photos/seed/hero3/2400/800",
        "https://picsum.photos/seed/hero4/2400/800"
      ],
      features: ["Эксклюзивность", "Безупречность", "Вечность"]
    },
    {
      id: 3,
      title: "Индивидуальность",
      subtitle: "для избранных",
      description: "Создайте уникальный стол, который станет центром вашего пространства и отражением вашего статуса",
      images: [
        "https://picsum.photos/seed/hero5/2400/800",
        "https://picsum.photos/seed/hero6/2400/800"
      ],
      features: ["Персонализация", "Эксклюзивность", "Престиж"]
    }
  ]);

  const handleAddImageClick = () => {
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleDeleteImageClick = () => {
    if (slides[currentSlide].images.length === 1) {
      alert("Нельзя удалить последнее изображение.");
      return;
    }
    setModalMode('delete');
    setIsModalOpen(true);
  };

  const handleModalConfirm = (imageUrl?: string) => {
    if (modalMode === 'add' && imageUrl) {
      setSlides(prevSlides =>
        prevSlides.map((slide, index) =>
          index === currentSlide
            ? { ...slide, images: [...slide.images, imageUrl] }
            : slide
        )
      );
    } else if (modalMode === 'delete') {
      setSlides(prevSlides =>
        prevSlides.map((slide, index) => {
          if (index === currentSlide) {
            const newImages = slide.images.filter(img => img !== slide.images[0]); // Only delete the currently displayed image for now
            return { ...slide, images: newImages.length > 0 ? newImages : ["https://picsum.photos/seed/placeholder/2400/800"] }; // Placeholder if no images left
          }
          return slide;
        })
      );
      setCurrentSlide(0); // Reset to first slide after deletion
    }
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
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
          backgroundImage: `url(${slide.images[0]})`,
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

          {/* Image Management Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <Button size="sm" variant="outline" onClick={handleAddImageClick}>
              <PlusCircle className="w-4 h-4 mr-2" /> Добавить изображение
            </Button>
            <Button size="sm" variant="destructive" onClick={handleDeleteImageClick}>
              <XCircle className="w-4 h-4 mr-2" /> Удалить изображение
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
      <ImageFormModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
        mode={modalMode}
        currentImageUrl={modalMode === 'delete' ? slide.images[0] : undefined}
      />
    </section>
  );
};

export default HeroSection;