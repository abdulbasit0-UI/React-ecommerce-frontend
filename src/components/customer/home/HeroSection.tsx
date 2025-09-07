import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../ui/button';

const slides = [
  {
    id: 1,
    title: 'Summer Collection 2024',
    subtitle: 'Discover the latest trends',
    description: 'Shop our new summer collection with up to 50% off on selected items',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop',
    cta: 'Shop Now',
    link: '/shop',
  },
  {
    id: 2,
    title: 'Electronics Sale',
    subtitle: 'Latest gadgets at best prices',
    description: 'Get the newest electronics with exclusive deals and fast shipping',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1920&h=1080&fit=crop',
    cta: 'Explore Deals',
    link: '/categories/electronics',
  },
  {
    id: 3,
    title: 'Fashion Week',
    subtitle: 'Premium brands collection',
    description: 'Discover luxury fashion from top designers worldwide',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&h=1080&fit=crop',
    cta: 'View Collection',
    link: '/brands',
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10" />
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-xl text-white">
                <h2 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
                  {slide.title}
                </h2>
                <h3 className="text-2xl md:text-3xl mb-4 text-gray-200 animate-slide-up">
                  {slide.subtitle}
                </h3>
                <p className="text-lg mb-8 text-gray-300 animate-slide-up">
                  {slide.description}
                </p>
                <Link to={slide.link}>
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 animate-slide-up"
                  >
                    {slide.cta}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
}