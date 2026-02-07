import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { languages } from '../locales';
import { ChevronDown } from 'lucide-react';

export function LanguageSelector() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  // Detect dark mode
  const isDark = document.documentElement.classList.contains('dark');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent body scroll when modal is open on mobile
  useEffect(() => {
    if (isOpen && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Prevent parent scroll when scrolling inside dropdown (Desktop mostly)
  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement || !isOpen) return;

    const preventParentScroll = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = scrollElement;
      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      if (
        (isScrollingDown && scrollTop + clientHeight >= scrollHeight - 1) ||
        (isScrollingUp && scrollTop <= 0)
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    scrollElement.addEventListener('wheel', preventParentScroll, { passive: false });

    return () => {
      scrollElement.removeEventListener('wheel', preventParentScroll);
    };
  }, [isOpen]);

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  // Dropdown styles based on theme
  const dropdownStyle = isDark ? {
    maxHeight: '400px',
    background: 'rgba(15, 15, 19, 0.95)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)'
  } : {
    maxHeight: '400px',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="ios-surface px-4 py-3 md:px-5 md:py-3 text-sm md:text-base font-medium transition-all duration-300 liquid-glow flex-shrink-0 flex items-center gap-2"
      >
        <span className="text-lg md:text-xl">{currentLanguage.flag}</span>
        <span className="hidden sm:inline">{currentLanguage.code.toUpperCase()}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full mt-4 w-64 mx-auto z-50 rounded-xl overflow-hidden shadow-2xl border"
          style={{
            ...dropdownStyle,
            maxHeight: '60vh', // Ensure it doesn't overflow screen height on mobile
          }}
        >
          {/* Header - Fixed */}
          <div className="px-4 py-3 border-b border-border/30 bg-background/50 flex-shrink-0">
            <div className="text-sm font-semibold text-foreground">Select Language</div>
            <div className="text-xs text-muted-foreground mt-1">{languages.length} languages available</div>
          </div>

          {/* Scrollable List */}
          <div
            ref={scrollRef}
            className="overflow-y-auto"
            style={{
              maxHeight: window.innerWidth >= 768 ? '340px' : '60vh',
              overflowY: 'auto',
              overscrollBehavior: 'contain',
              WebkitOverflowScrolling: 'touch',
              borderBottomLeftRadius: '12px',
              borderBottomRightRadius: '12px'
            }}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`w-full px-4 py-3 text-left hover:bg-primary/10 transition-colors duration-200 flex items-center gap-3 ${i18n.language === lang.code ? 'bg-primary/20 text-primary' : 'text-foreground'
                  }`}
              >
                <span className="text-xl flex-shrink-0">{lang.flag}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{lang.nativeName}</div>
                  <div className="text-xs text-muted-foreground truncate">{lang.name}</div>
                </div>
                {i18n.language === lang.code && (
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
