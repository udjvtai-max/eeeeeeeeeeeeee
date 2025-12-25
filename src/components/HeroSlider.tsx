import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import minecraftHero from "@/assets/minecraft-hero.jpg";
import vpsHero from "@/assets/vps-hero.jpg";
import webHostingHero from "@/assets/web-hosting-hero.jpg";

const slides = [
  {
    id: 1,
    title: "Minecraft Premium",
    subtitle: "Ultra-Low Latency BDIX Gaming",
    price: "390",
    discount: "BDIX",
    image: minecraftHero,
    features: ["Instant Setup", "1-20ms Latency", "24/7 Support"],
    link: "/pricing/minecraft",
  },
  {
    id: 2,
    title: "VPS Hosting",
    subtitle: "High Performance Intel Servers",
    price: "700",
    discount: "Intel",
    image: vpsHero,
    features: ["Full Root Access", "SSD Storage", "99.9% Uptime"],
    link: "/vps-pricing",
  },
  {
    id: 3,
    title: "Web Hosting",
    subtitle: "Fast & Reliable LiteSpeed Hosting",
    price: "99",
    discount: "Popular",
    image: webHostingHero,
    features: ["Free SSL", "Unlimited Bandwidth", "Daily Backup"],
    link: "/web-hosting-pricing",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const slide = slides[currentSlide];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{ backgroundImage: `url(${slide.image})`, backgroundPosition: 'center center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
        <div key={slide.id}>
          {/* Discount Badge */}
          <span className="inline-block px-4 py-1.5 rounded-md text-sm font-semibold bg-primary/15 text-primary border border-primary/25 mb-6">
            {slide.discount}
          </span>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tight">
            <span className="text-gradient">{slide.title}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {slide.subtitle}
          </p>

          {/* Price */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="text-muted-foreground text-lg">Starting at</span>
            <span className="text-5xl md:text-6xl font-black text-gradient">৳{slide.price}</span>
            <span className="text-muted-foreground text-lg">/Month</span>
          </div>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {slide.features.map((feature) => (
              <span
                key={feature}
                className="px-4 py-2 rounded-md bg-card/80 border border-border text-sm font-medium"
              >
                {feature}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#games"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-md font-bold text-lg hover:bg-primary/90 transition-colors"
            >
              Get Started Now
            </a>
            <a
              href="#features"
              className="px-8 py-4 bg-card text-foreground rounded-md font-bold text-lg border border-border hover:border-primary/40 transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-md bg-card/90 border border-border hover:border-primary/40 transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-md bg-card/90 border border-border hover:border-primary/40 transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide
                ? "bg-primary w-8"
                : "bg-muted w-2 hover:bg-muted-foreground"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
