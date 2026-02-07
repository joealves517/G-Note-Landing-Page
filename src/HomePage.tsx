import { useState, useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';
import {
  Wallet,
  Globe,
  Shield,
  Coins,
  Zap,
  Settings,
  Smartphone,
  Monitor,
  Chrome,
  Download,
  ArrowRight,
  CheckCircle,
  Lock,
  Fingerprint,
  Key,
  Eye,
  FileText,
  Server,
  TrendingUp,
  Layers,
  Star,
  Moon,
  Sun,
  MessageCircle,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  BookOpen,
  MonitorSpeaker,
  Twitter,
  Github,
  Cloud,
  Users,
  WifiOff,
  ShieldCheck,
  History,
  Search,
  Mic,
  Sparkles
} from "lucide-react";

// Import interface images and new blog images
import walletHomeImage from './assets/a285a8bd01801376b8ba2d3bef483601aa5142bb.png';
import walletExploreImage from './assets/d103a88aecd7423f54f104390e0c0b4acfc09397.png';
import walletNftImage from './assets/822fa028fdf590702f11c601c365b8d4c8de5319.png';

// Import new blog post images
import blogImage38 from './assets/feature-ai.png'; // AI
import blogImage37 from './assets/feature-sync.jpg'; // Sync
import blogImage36 from './assets/feature-collab.png'; // Realtime
import { LINKS } from './lib/urls';

// Import G-Note logos
import gNoteLogo from '../public/g-note.svg';
import gNoteLogoDark from '../public/g-note-dark.svg';

// Import i18n
import './locales';
import { LanguageSelector } from './components/LanguageSelector';
import { SEO } from './components/SEO';
import './Home.css';

// Telegram Icon Component
function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.13-.31-1.09-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
    </svg>
  );
}

// Removed hardcoded translations - now using i18n

// Navigation icons mapping
const navIcons = {
  blog: BookOpen,
  interface: MonitorSpeaker,
  features: Star,
  security: Shield,
  platforms: Download
};

// Custom G-Note AI Logo Component with theme support
function GNoteAILogo({ className, theme }: { className?: string, theme: 'light' | 'dark' }) {
  return (
    <img
      src={theme === 'dark' ? gNoteLogoDark : gNoteLogo}
      alt="G-Note AI"
      className={`${className} object-contain`}
    />
  );
}

function FloatingOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="floating-orb w-8 h-8 md:w-16 md:h-16 top-20 left-10 md:left-20" style={{ animationDelay: '0s' }} />
      <div className="floating-orb w-6 h-6 md:w-12 md:h-12 top-40 right-16 md:right-32" style={{ animationDelay: '-10s' }} />
      <div className="floating-orb w-10 h-10 md:w-20 md:h-20 bottom-40 left-20 md:left-40" style={{ animationDelay: '-20s' }} />
      <div className="floating-orb w-4 h-4 md:w-8 md:h-8 top-60 left-1/2" style={{ animationDelay: '-15s' }} />
      <div className="floating-orb w-7 h-7 md:w-14 md:h-14 bottom-20 right-10 md:right-20" style={{ animationDelay: '-5s' }} />
    </div>
  );
}

function LiquidBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="liquid-blob liquid-blob-1" />
      <div className="liquid-blob liquid-blob-2" />
      <div className="liquid-blob liquid-blob-3" />
    </div>
  );
}

function ThemeToggle({ theme, setTheme }: { theme: 'light' | 'dark', setTheme: (theme: 'light' | 'dark') => void }) {
  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="ios-surface w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 liquid-glow flex-shrink-0"
    >
      {theme === 'light' ? (
        <Moon className="w-6 h-6 md:w-7 md:h-7 text-foreground" />
      ) : (
        <Sun className="w-6 h-6 md:w-7 md:h-7 text-foreground" />
      )}
    </button>
  );
}

function LanguageToggle() {
  return <LanguageSelector />;
}

function Header({ theme, setTheme }: {
  theme: 'light' | 'dark',
  setTheme: (theme: 'light' | 'dark') => void
}) {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerWidth, setHeaderWidth] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleResize = () => {
      if (headerRef.current) {
        setHeaderWidth(headerRef.current.offsetWidth);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollToPlatforms = () => {
    const platformsSection = document.getElementById('platforms');
    if (platformsSection) {
      platformsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Adjusted breakpoint - switch to compact mode earlier (increased from 1200 to 1400)
  const shouldShowIconOnly = headerWidth < 1400 && headerWidth > 0;

  return (
    <header
      ref={headerRef}
      className={mobileMenuOpen
        ? "fixed inset-0 z-50 h-screen bg-background overflow-y-auto"
        : `absolute top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'glass-strong-transparent' : 'glass-transparent'}`
      }
    >
      <div className="container mx-auto px-4 md:px-6 py-5 md:py-6">
        <div className="flex items-center justify-between">
          {/* Logo aligned to left edge with enhanced hover */}
          <button
            onClick={scrollToTop}
            className="flex items-start gap-3 md:gap-4 header-logo-enhanced header-logo-left-aligned min-w-0 flex-shrink-0 transition-all duration-300"
          >
            <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center flex-shrink-0">
              <GNoteAILogo className="w-12 h-12 md:w-14 md:h-14" theme={theme} />
            </div>
            <div className="hidden sm:block min-w-0 text-left">
              <h4 className="text-foreground font-bold text-lg md:text-xl truncate leading-tight">G-Note AI</h4>
              <p className="text-muted-foreground text-sm md:text-base truncate leading-tight">{t('common.tagline')}</p>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {['blog', 'interface', 'features', 'security', 'platforms'].map((key) => (
              <a
                key={key}
                href={`#${key}`}
                className="text-foreground hover:text-primary transition-all duration-300 font-medium relative group text-base whitespace-nowrap"
              >
                {t(`nav.${key}`)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full rounded-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
            <ThemeToggle theme={theme} setTheme={setTheme} />
            <LanguageToggle />

            {/* Responsive download button with improved centering */}
            {shouldShowIconOnly ? (
              <button
                onClick={scrollToPlatforms}
                className="hidden sm:flex liquid-button w-12 h-12 md:w-14 md:h-14 rounded-full items-center justify-center transition-all duration-300 hover:scale-105"
              >
                <Download className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
              </button>
            ) : (
              <button
                onClick={scrollToPlatforms}
                className="hidden sm:block liquid-button px-5 md:px-7 py-3 md:py-4 text-sm md:text-base font-medium text-primary-foreground rounded-lg md:rounded-xl whitespace-nowrap"
              >
                {t('hero.downloadNow')}
              </button>
            )}

            {/* Mobile menu button - larger for mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden ios-surface w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 flex-shrink-0"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 md:w-7 md:h-7 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 md:w-7 md:h-7 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu with icons */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-6 pt-6 border-t border-border/50">
            <nav className="flex flex-col gap-5">
              {['blog', 'interface', 'features', 'security', 'platforms'].map((key) => {
                const IconComponent = navIcons[key as keyof typeof navIcons];
                return (
                  <a
                    key={key}
                    href={`#${key}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-foreground hover:text-primary transition-all duration-300 font-medium py-3 text-lg flex items-center gap-4"
                  >
                    <IconComponent className="w-6 h-6 text-primary" />
                    {t(`nav.${key}`)}
                  </a>
                );
              })}
              <button
                onClick={() => {
                  scrollToPlatforms();
                  setMobileMenuOpen(false);
                }}
                className="liquid-button px-6 py-3 text-base font-medium text-primary-foreground rounded-xl mt-4 text-center flex items-center gap-3 justify-center"
              >
                <Download className="w-5 h-5" />
                {t('hero.downloadNow')}
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

function HeroSection() {
  const { t } = useTranslation();

  const scrollToPlatforms = () => {
    const platformsSection = document.getElementById('platforms');
    if (platformsSection) {
      platformsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center justify-center pt-48 md:pt-56 pb-16 md:pb-20">
      <LiquidBackground />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-4xl xl:max-w-6xl mx-auto">
          <div className="mb-8 md:mb-10">
            <h1 className="text-foreground mb-3 leading-tight px-4">
              {t('hero.title')}
            </h1>
            <div className="iridescent-text-enhanced px-4">
              {t('hero.titleHighlight')}
            </div>
          </div>

          {/* Split intro paragraph with line break */}
          <div className="text-xl md:text-2xl lg:text-3xl text-muted-foreground-enhanced mb-10 md:mb-14 max-w-3xl lg:max-w-4xl mx-auto leading-relaxed px-4">
            <p className="mb-4">{t('hero.subtitle')}</p>
            <p>{t('hero.subtitleSecond')}</p>
          </div>

          {/* Dual hero buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 mb-14 md:mb-20 px-4">
            <button
              onClick={scrollToPlatforms}
              className="liquid-button px-10 md:px-14 py-4 md:py-5 text-lg md:text-xl font-semibold text-primary-foreground rounded-xl md:rounded-2xl group inline-flex items-center justify-center gap-4"
            >
              <span className="flex items-center gap-4">
                {t('hero.downloadNow')}
                <ArrowRight className="w-6 h-6 md:w-7 md:h-7 transition-transform group-hover:translate-x-1" />
              </span>
            </button>

            <a
              href={LINKS.APP}
              className="ios-surface px-10 md:px-14 py-4 md:py-5 text-lg md:text-xl font-semibold text-foreground rounded-xl md:rounded-2xl group inline-flex items-center justify-center gap-4 hover:scale-105 transition-all duration-300"
            >
              <span className="flex items-center gap-4">
                {t('hero.openWeb')}
                <ExternalLink className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:scale-110" />
              </span>
            </a>
          </div>

          {/* Feature cards with pastel backgrounds and vivid colored icons */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 max-w-5xl xl:max-w-6xl mx-auto px-4">
            <div className="liquid-card p-4 md:p-8 text-center group">
              <div className="w-12 h-12 md:w-20 md:h-20 mx-auto mb-3 md:mb-6 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 pastel-blue-bg">
                <BookOpen className="w-6 h-6 md:w-10 md:h-10 text-blue-600" />
              </div>
              <h5 className="text-foreground mb-2 md:mb-3 text-xs md:text-base leading-tight">{t('hero.heroFeatures.editing.title')}</h5>
              <p className="text-muted-foreground-enhanced text-xs md:text-base">{t('hero.heroFeatures.editing.description')}</p>
            </div>

            <div className="liquid-card p-4 md:p-8 text-center group">
              <div className="w-12 h-12 md:w-20 md:h-20 mx-auto mb-3 md:mb-6 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 pastel-green-bg">
                <Sparkles className="w-6 h-6 md:w-10 md:h-10 text-green-600" />
              </div>
              <h5 className="text-foreground mb-2 md:mb-3 text-xs md:text-base leading-tight">{t('hero.heroFeatures.ai.title')}</h5>
              <p className="text-muted-foreground-enhanced text-xs md:text-base">{t('hero.heroFeatures.ai.description')}</p>
            </div>

            <div className="liquid-card p-4 md:p-8 text-center group">
              <div className="w-12 h-12 md:w-20 md:h-20 mx-auto mb-3 md:mb-6 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 pastel-red-bg">
                <ShieldCheck className="w-6 h-6 md:w-10 md:h-10 text-red-600" />
              </div>
              <h5 className="text-foreground mb-2 md:mb-3 text-xs md:text-base leading-tight">{t('hero.heroFeatures.privacy.title')}</h5>
              <p className="text-muted-foreground-enhanced text-xs md:text-base">{t('hero.heroFeatures.privacy.description')}</p>
            </div>

            <div className="liquid-card p-4 md:p-8 text-center group">
              <div className="w-12 h-12 md:w-20 md:h-20 mx-auto mb-3 md:mb-6 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 pastel-purple-bg">
                <Search className="w-6 h-6 md:w-10 md:h-10 text-purple-600" />
              </div>
              <h5 className="text-foreground mb-2 md:mb-3 text-xs md:text-base leading-tight">{t('hero.heroFeatures.search.title')}</h5>
              <p className="text-muted-foreground-enhanced text-xs md:text-base">{t('hero.heroFeatures.search.description')}</p>
            </div>
          </div>
        </div>
      </div>

      <FloatingOrbs />
    </section>
  );
}

function CarouselSection({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const items = Array.isArray(children) ? children : [children];
  const totalItems = items.length;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;

    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    setIsDragging(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setStartX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const endX = e.clientX;
    const diffX = startX - endX;

    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    setIsDragging(false);
  };

  return (
    <div className={`relative carousel-section ${className}`}>
      {/* Enhanced carousel arrows - larger but more transparent */}
      <button
        onClick={prevSlide}
        className="carousel-arrow carousel-arrow-left absolute left-2 top-1/2 -translate-y-1/2 z-10 transition-all duration-300 hover:scale-110 lg:hidden"
      >
        <ChevronLeft className="w-12 h-12 text-foreground drop-shadow-lg" strokeWidth={2} />
      </button>

      <button
        onClick={nextSlide}
        className="carousel-arrow carousel-arrow-right absolute right-2 top-1/2 -translate-y-1/2 z-10 transition-all duration-300 hover:scale-110 lg:hidden"
      >
        <ChevronRight className="w-12 h-12 text-foreground drop-shadow-lg" strokeWidth={2} />
      </button>

      {/* Carousel container */}
      <div
        ref={carouselRef}
        className="overflow-hidden lg:overflow-visible"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: 'pan-y' }}
      >
        <div className="flex lg:grid lg:grid-cols-3 lg:gap-8 transition-transform duration-300 ease-out lg:transform-none"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {items.map((item, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-full lg:w-auto px-8 lg:px-0 transition-all duration-300 ${index === currentIndex ? 'scale-100 opacity-100' : 'scale-90 opacity-70 lg:scale-100 lg:opacity-100'
                }`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center mt-6 lg:hidden space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-primary w-6' : 'bg-muted-foreground/30'
              }`}
          />
        ))}
      </div>
    </div>
  );
}

function BlogSection() {
  const { t } = useTranslation();

  // Real feature highlights based on actual app capabilities
  const featureHighlights = [
    {
      title: t('blog.featureHighlights.aiAssistant.title'),
      excerpt: t('blog.featureHighlights.aiAssistant.excerpt'),
      icon: Sparkles,
      image: blogImage38,
      badge: t('blog.featureHighlights.aiAssistant.badge')
    },
    {
      title: t('blog.featureHighlights.driveSync.title'),
      excerpt: t('blog.featureHighlights.driveSync.excerpt'),
      icon: Cloud,
      image: blogImage37,
      badge: t('blog.featureHighlights.driveSync.badge')
    },
    {
      title: t('blog.featureHighlights.collaboration.title'),
      excerpt: t('blog.featureHighlights.collaboration.excerpt'),
      icon: Users,
      image: blogImage36,
      badge: t('blog.featureHighlights.collaboration.badge')
    }
  ];

  return (
    <section id="blog" className="py-12 md:py-16 relative overflow-visible">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-foreground mb-4 md:mb-6 px-4">
            {t('blog.title')}
          </h2>
          <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground-enhanced max-w-3xl lg:max-w-4xl mx-auto px-4">
            {t('blog.subtitle')}
          </p>
        </div>

        {/* Carousel-style scrolling on mobile with equal heights */}
        <CarouselSection className="mb-8 md:mb-12">
          {featureHighlights.map((feature, index) => (
            <article key={index} className="blog-card-equal-height p-6 md:p-8 group flex flex-col">
              <div className="mb-4 md:mb-6 rounded-xl md:rounded-2xl overflow-hidden aspect-square">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg md:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 hover:bg-primary/10">
                  <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <div>
                  <span className="text-primary text-sm md:text-base font-semibold">
                    {feature.badge}
                  </span>
                </div>
              </div>

              <h3 className="text-foreground mb-3 md:mb-4 group-hover:text-primary transition-colors duration-300 text-sm md:text-lg font-bold leading-tight flex-grow">
                {feature.title}
              </h3>

              <p className="text-muted-foreground-enhanced mb-4 md:mb-6 text-sm md:text-base leading-relaxed flex-grow">
                {feature.excerpt}
              </p>
            </article>
          ))}
        </CarouselSection>

        <div className="text-center">
          <a
            href="#features"
            className="liquid-button px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold text-primary-foreground rounded-xl md:rounded-2xl inline-flex items-center gap-3"
          >
            <span className="flex items-center gap-3">
              {t('blog.viewAll')}
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

function IPhoneFrame({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* iPhone card container */}
      <div className="liquid-card p-6 md:p-8">
        {/* iPhone frame with black border */}
        <div className="wallet-phone-black max-w-80 mx-auto">
          {/* Screen content - Removed padding to fix gap */}
          <div className="wallet-screen">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function WalletShowcase() {
  const { t } = useTranslation();

  const walletInterfaces = [
    {
      title: t('wallet.mainInterface'),
      description: t('wallet.mainInterfaceDesc'),
      image: walletHomeImage,
      alt: t('wallet.mainInterfaceAlt')
    },
    {
      title: t('wallet.exploreInterface'),
      description: t('wallet.exploreInterfaceDesc'),
      image: walletExploreImage,
      alt: t('wallet.exploreInterfaceAlt')
    },
    {
      title: t('wallet.nftInterface'),
      description: t('wallet.nftInterfaceDesc'),
      image: walletNftImage,
      alt: t('wallet.nftInterfaceAlt')
    }
  ];

  return (
    <section id="interface" className="py-12 md:py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-foreground mb-4 md:mb-6 px-4">
            {t('wallet.title')}
          </h2>
          <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground-enhanced max-w-3xl lg:max-w-4xl mx-auto px-4">
            {t('wallet.subtitle')}
          </p>
        </div>

        {/* Carousel-style interface screenshots */}
        <CarouselSection>
          {walletInterfaces.map((walletInterface, index) => (
            <div key={index} className="text-center">
              <div className="mb-4 md:mb-8">
                <IPhoneFrame>
                  <img
                    src={walletInterface.image}
                    alt={walletInterface.alt}
                    className="w-full h-full object-cover"
                  />
                </IPhoneFrame>
              </div>
              <h4 className="text-foreground mb-2 md:mb-3 text-sm md:text-xl leading-tight">{walletInterface.title}</h4>
              <p className="text-muted-foreground-enhanced text-sm md:text-lg">{walletInterface.description}</p>
            </div>
          ))}
        </CarouselSection>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const { t } = useTranslation();

  const features = [
    {
      title: t('features.editing.title'),
      description: t('features.editing.description'),
      icon: BookOpen,
      iconColor: "text-primary",
      titleColor: "group-hover:text-primary",
      bgGradient: "from-primary/20 to-accent/20",
      hoverBg: "hover:bg-primary/10"
    },
    {
      title: t('features.ai.title'),
      description: t('features.ai.description'),
      icon: Sparkles,
      iconColor: "text-chart-3",
      titleColor: "group-hover:text-chart-3",
      bgGradient: "from-chart-3/20 to-chart-2/20",
      hoverBg: "hover:bg-chart-3/10"
    },
    {
      title: t('features.privacy.title'),
      description: t('features.privacy.description'),
      icon: ShieldCheck,
      iconColor: "text-chart-4",
      titleColor: "group-hover:text-chart-4",
      bgGradient: "from-chart-4/20 to-chart-5/20",
      hoverBg: "hover:bg-chart-4/10"
    },
    {
      title: t('features.search.title'),
      description: t('features.search.description'),
      icon: Search,
      iconColor: "text-chart-5",
      titleColor: "group-hover:text-chart-5",
      bgGradient: "from-chart-5/20 to-chart-2/20",
      hoverBg: "hover:bg-chart-5/10"
    },
    {
      title: t('features.voice.title'),
      description: t('features.voice.description'),
      icon: Mic,
      iconColor: "text-purple",
      titleColor: "group-hover:text-purple",
      bgGradient: "from-purple/20 to-chart-2/20",
      hoverBg: "hover:bg-purple/10"
    },
    {
      title: t('features.ui.title'),
      description: t('features.ui.description'),
      icon: Settings,
      iconColor: "text-green-500",
      titleColor: "group-hover:text-green-500",
      bgGradient: "from-green-500/20 to-chart-3/20",
      hoverBg: "hover:bg-green-500/10"
    }
  ];

  return (
    <section id="features" className="py-12 md:py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-foreground mb-4 md:mb-6 px-4">
            {t('features.title')}
          </h2>
          <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground-enhanced max-w-3xl lg:max-w-4xl mx-auto px-4">
            {t('features.subtitle')}
          </p>
        </div>

        {/* Horizontal scrolling carousel for features */}
        <CarouselSection>
          {features.map((feature, index) => (
            <div key={index} className="liquid-card p-6 md:p-10 group relative overflow-hidden h-full">
              <div className="relative">
                <div className={`w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br ${feature.bgGradient} rounded-2xl md:rounded-3xl flex items-center justify-center mb-6 md:mb-8 group-hover:scale-110 transition-all duration-500 ${feature.hoverBg}`}>
                  <feature.icon className={`w-8 h-8 md:w-12 md:h-12 ${feature.iconColor}`} />
                </div>
                <h3 className={`text-foreground mb-3 md:mb-4 ${feature.titleColor} transition-colors duration-300 text-lg md:text-3xl leading-tight`}>
                  {feature.title}
                </h3>
                <p className="text-muted-foreground-enhanced leading-relaxed text-base md:text-lg">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </CarouselSection>
      </div>
    </section>
  );
}

function SecuritySection() {
  const { t } = useTranslation();

  const securityFeatures = [
    {
      title: t('security.endToEndEncryption.title'),
      description: t('security.endToEndEncryption.description'),
      icon: Cloud
    },
    {
      title: t('security.biometricAuth.title'),
      description: t('security.biometricAuth.description'),
      icon: Users
    },
    {
      title: t('security.hardwareWallet.title'),
      description: t('security.hardwareWallet.description'),
      icon: WifiOff
    },
    {
      title: t('security.privacyFirst.title'),
      description: t('security.privacyFirst.description'),
      icon: ShieldCheck
    },
    {
      title: t('security.multiSignature.title'),
      description: t('security.multiSignature.description'),
      icon: History
    },
    {
      title: t('security.decentralizedInfra.title'),
      description: t('security.decentralizedInfra.description'),
      icon: Github
    }
  ];

  return (
    <section id="security" className="py-12 md:py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-foreground mb-4 md:mb-6 px-4">
            {t('security.title')}
          </h2>
          <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground-enhanced max-w-3xl lg:max-w-4xl mx-auto px-4">
            {t('security.subtitle')}
          </p>
        </div>

        {/* Horizontal scrolling carousel for security features */}
        <CarouselSection className="mb-10 md:mb-14">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="liquid-card p-6 md:p-10 text-center group h-full">
              <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-destructive/20 to-chart-4/20 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-300 hover:bg-destructive/10">
                <feature.icon className="w-8 h-8 md:w-12 md:h-12 text-destructive" />
              </div>
              <h4 className="text-foreground mb-3 md:mb-4 text-base md:text-xl leading-tight">
                {feature.title}
              </h4>
              <p className="text-muted-foreground-enhanced text-base md:text-lg">
                {feature.description}
              </p>
            </div>
          ))}
        </CarouselSection>

        <div className="liquid-card p-8 md:p-12 text-center">
          <h3 className="text-foreground mb-4 md:mb-6 text-xl md:text-3xl">
            {t('security.audited')}
          </h3>
          <p className="text-lg md:text-xl text-muted-foreground-enhanced mb-6 md:mb-8 max-w-3xl lg:max-w-4xl mx-auto">
            {t('security.auditedDesc')}
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {[
              { text: t('security.badges.openSource'), icon: Github },
              { text: t('security.badges.googleDrive'), icon: Cloud },
              { text: t('security.badges.privacyFocused'), icon: ShieldCheck }
            ].map((badge, index) => (
              <span key={index} className="ios-surface-dark px-4 md:px-8 py-3 md:py-4 font-semibold text-foreground hover:scale-105 transition-all duration-300 rounded-xl md:rounded-2xl inline-flex items-center gap-2 md:gap-3 text-sm md:text-base">
                <badge.icon className="w-4 h-4 md:w-5 md:h-5" />
                {badge.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PlatformsSection() {
  const { t } = useTranslation();
  return (
    <section id="platforms" className="py-12 md:py-16 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="liquid-blob liquid-blob-1" />
        <div className="liquid-blob liquid-blob-2" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-foreground mb-4 md:mb-6 px-4">
            {t('platforms.title')}
          </h2>
          <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground-enhanced max-w-3xl lg:max-w-4xl mx-auto px-4">
            {t('platforms.subtitle')}
          </p>
        </div>

        {/* Improved Russian alignment - 2 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-5xl xl:max-w-6xl mx-auto mb-10 md:mb-14">
          {[
            {
              title: t('platforms.miniApp'), icon: Globe, buttons: [
                { text: t('platforms.buttons.webApp'), link: LINKS.APP }
              ]
            },
            {
              title: t('platforms.browser'), icon: Chrome, buttons: [
                { text: t('platforms.buttons.addToChrome'), link: LINKS.EXTENSION }
              ]
            },
            {
              title: t('platforms.desktop'), icon: Monitor, buttons: [
                { text: t('platforms.buttons.installApp'), link: LINKS.APP }
              ]
            },
            {
              title: t('platforms.mobile'), icon: Smartphone, buttons: [
                { text: t('platforms.buttons.installApp'), link: LINKS.APP }
              ]
            },
          ].map((platform, index) => (
            <div key={index} className="liquid-card p-4 md:p-8 lg:p-10 text-center group flex flex-col h-full">
              <div className="flex-1 flex flex-col items-center justify-start">
                <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl md:rounded-3xl flex items-center justify-center mb-4 md:mb-6 lg:mb-8 group-hover:scale-110 transition-transform duration-300 hover:bg-primary/10">
                  <platform.icon className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-primary" />
                </div>
                <h3 className="text-foreground mb-4 md:mb-6 lg:mb-8 text-sm md:text-lg lg:text-2xl xl:text-3xl leading-tight text-center break-words hyphens-auto">{platform.title}</h3>
              </div>
              <div className="space-y-2 md:space-y-3 lg:space-y-4 mt-auto w-full">
                {platform.buttons.map((button, buttonIndex) => (
                  <a
                    key={buttonIndex}
                    href={button.link}
                    className="ios-surface-dark w-full py-2 md:py-3 lg:py-4 font-medium text-foreground hover:scale-105 transition-all duration-300 rounded-lg md:rounded-xl block text-sm md:text-base lg:text-lg text-center"
                  >
                    {button.text}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a href={LINKS.APP} className="liquid-button px-8 md:px-12 py-4 md:py-5 text-lg md:text-xl font-bold text-primary-foreground rounded-xl md:rounded-2xl inline-flex items-center gap-3">
            <span className="flex items-center gap-3">
              <Download className="w-5 h-5 md:w-6 md:h-6" />
              {t('platforms.getStarted')}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer({ theme }: { theme: 'light' | 'dark' }) {
  const { t } = useTranslation();
  return (
    <footer className="py-6 md:py-10 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {/* Simplified footer design with left-aligned G-Note AI and no logo background */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Brand section */}
          <div className="mb-8 md:mb-12">
            <div className="flex items-center justify-center gap-3 md:gap-4 mb-6 md:mb-8">
              <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center flex-shrink-0">
                <GNoteAILogo className="w-16 h-16 md:w-20 md:h-20" theme={theme} />
              </div>
              <div className="min-w-0 text-left">
                <h4 className="text-xl md:text-3xl font-bold text-foreground mb-1 text-left">G-Note AI</h4>
                <p className="text-base md:text-lg text-primary font-medium text-left">{t('common.tagline')}</p>
              </div>
            </div>
            <p className="text-base md:text-lg text-muted-foreground-enhanced leading-relaxed mb-8 md:mb-10 max-w-2xl mx-auto">
              {t('footer.tagline')}
            </p>

            {/* Social links with proper platform icons */}
            <div className="flex justify-center gap-4 md:gap-6 mb-8 md:mb-10">
              {[
                { text: t('footer.social.twitter'), href: "https://twitter.com/GNoteAI", icon: Twitter },
                { text: t('footer.social.telegram'), href: `https://${t('footer.telegramLink')}`, icon: TelegramIcon },
                { text: t('footer.social.github'), href: "https://github.com/gnoteai", icon: Github }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="ios-surface px-4 py-3 rounded-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 text-foreground hover:text-primary font-medium"
                >
                  <social.icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{social.text}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Simplified footer bottom */}
          <div className="border-t border-border/50 pt-6 md:pt-8">
            <p className="text-base md:text-lg text-muted-foreground-enhanced text-center mb-4">
              {t('footer.copyright', { year: new Date().getFullYear() })}
            </p>
            <div className="flex justify-center gap-6 text-sm font-medium text-muted-foreground">
              <a href={LINKS.PRIVACY} className="hover:text-primary transition-colors">{t('footer.legal.privacy')}</a>
              <a href={LINKS.TERMS} className="hover:text-primary transition-colors">{t('footer.legal.terms')}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Apply theme to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="gnote-home-wrapper min-h-screen bg-background relative overflow-x-hidden">
      <SEO />
      <Header theme={theme} setTheme={setTheme} />
      <main>
        <HeroSection />
        <BlogSection />
        <WalletShowcase />
        <FeaturesSection />
        <SecuritySection />
        <PlatformsSection />
      </main>
      <Footer theme={theme} />
    </div>
  );
}
