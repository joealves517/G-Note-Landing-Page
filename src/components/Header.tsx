import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import {
  Download,
  Moon,
  Sun,
  Menu,
  X,
  BookOpen,
  MonitorSpeaker,
  Star,
  Shield,
  ArrowRight
} from "lucide-react";
import gNoteLogo from '../../public/g-note.svg';
import gNoteLogoDark from '../../public/g-note-dark.svg';

interface HeaderProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

function GNoteAILogo({ className, theme }: { className?: string, theme: 'light' | 'dark' }) {
  return (
    <img
      src={theme === 'dark' ? gNoteLogoDark : gNoteLogo}
      alt="G-Note AI"
      className={`${className} object-contain`}
    />
  );
}

const navItems = [
  { key: 'blog', icon: BookOpen },
  { key: 'interface', icon: MonitorSpeaker },
  { key: 'features', icon: Star },
  { key: 'security', icon: Shield },
  { key: 'platforms', icon: Download }
];

export function Header({ theme, setTheme }: HeaderProps) {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      const offset = 80; // Header height + padding
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <>
      <div className="fixed top-2 left-2 right-2 md:top-6 md:left-0 md:right-0 z-50 flex justify-center md:px-4 pointer-events-none">
        <header
          className={`pointer-events-auto w-full md:w-auto md:max-w-[calc(100vw-2rem)] rounded-3xl md:rounded-full transition-all duration-300 border backdrop-blur-xl shadow-sm md:shadow-lg shadow-neutral-200/20 dark:shadow-black/40 ${scrolled || mobileMenuOpen
            ? "bg-white/85 dark:bg-neutral-900/85 border-neutral-200/60 dark:border-neutral-800/60"
            : "bg-white/75 dark:bg-neutral-900/75 border-neutral-200/40 dark:border-neutral-800/40 hover:bg-white/90 dark:hover:bg-neutral-900/90 transition-colors"
            }`}
        >
          <div className="px-4 md:px-5 h-14 md:h-14 flex items-center justify-between md:justify-start gap-2 md:gap-3 max-w-7xl mx-auto w-full md:w-auto">
            {/* Logo */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 group focus:outline-none py-1.5 rounded-full hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50 transition-colors flex-shrink-0"
            >
              <GNoteAILogo className="w-8 h-8 md:w-7 md:h-7 transition-transform group-hover:scale-110" theme={theme} />
              <span className="text-lg font-bold tracking-tight text-neutral-800 dark:text-neutral-100 whitespace-nowrap">
                G-Note AI
              </span>
            </button>

            {/* Divider */}
            <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-800 mx-1 hidden lg:block" />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.key)}
                  className="px-3 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-full hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80 transition-all duration-200 whitespace-nowrap flex-shrink-0"
                >
                  {t(`nav.${item.key}`)}
                </button>
              ))}
            </nav>

            {/* Divider */}
            <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-800 mx-1 hidden lg:block" />

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="p-2 rounded-full text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80 transition-colors focus:outline-none"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </button>

              <div className="hidden sm:flex items-center gap-2">
                <a
                  href="https://gnoteai.com"
                  className="px-3 md:px-4 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white rounded-full hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80 transition-colors whitespace-nowrap flex items-center gap-1.5 flex-shrink-0"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span className="hidden xl:inline">{t('hero.openWeb')}</span>
                  <span className="hidden lg:inline xl:hidden">{t('platforms.buttons.webApp')}</span>
                  <span className="inline lg:hidden">Web App</span>
                </a>
                <button
                  onClick={() => scrollToSection('platforms')}
                  className="liquid-button px-4 md:px-5 py-2.5 text-sm font-semibold text-white dark:text-black rounded-full shadow-md transition-all duration-300 flex items-center gap-2 flex-shrink-0 whitespace-nowrap"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden lg:inline">{t('hero.downloadNow')}</span>
                  <span className="inline lg:hidden">{t('nav.platforms')}</span>
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-full text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80 transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute top-2 left-2 right-2 bottom-auto bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300 flex flex-col max-h-[calc(100vh-1rem)]">
            <div className="flex flex-col overflow-y-auto w-full h-full">
              <div className="flex items-center justify-between p-4 border-b border-neutral-100 dark:border-neutral-800">
                <button onClick={() => { scrollToTop(); setMobileMenuOpen(false); }} className="flex items-center gap-2">
                  <GNoteAILogo className="w-7 h-7" theme={theme} />
                  <span className="text-lg font-bold text-neutral-900 dark:text-white">G-Note AI</span>
                </button>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 -mr-2 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-2 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.key}
                      onClick={() => scrollToSection(item.key)}
                      className="flex items-center w-full gap-3 p-3 text-base font-medium text-left text-neutral-600 dark:text-neutral-300 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white transition-colors"
                    >
                      <Icon className="w-5 h-5 opacity-70" />
                      {t(`nav.${item.key}`)}
                    </button>
                  );
                })}
              </div>

              <div className="p-4 border-t border-neutral-100 dark:border-neutral-800 space-y-3 bg-neutral-50/50 dark:bg-neutral-900/50">
                <button
                  onClick={() => scrollToSection('platforms')}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold text-white dark:text-black bg-neutral-900 dark:bg-white rounded-xl hover:bg-black dark:hover:bg-neutral-200 transition-all shadow-md"
                >
                  <Download className="w-4 h-4" />
                  {t('hero.downloadNow')}
                </button>

                <a
                  href="https://gnoteai.com"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  {t('hero.openWeb') || 'Log in'}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
