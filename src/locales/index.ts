import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import all locale files
import en from './en.json';
import vi from './vi.json';
import ja from './ja.json';
import ko from './ko.json';
import zhCN from './zh-CN.json';
import zhTW from './zh-TW.json';
import de from './de.json';
import fr from './fr.json';
import es from './es.json';
import ptBR from './pt-BR.json';
import it from './it.json';
import nl from './nl.json';
import ar from './ar.json';
import hi from './hi.json';
import tr from './tr.json';
import pl from './pl.json';
import th from './th.json';
import id from './id.json';

export const resources = {
  en: { translation: en },
  vi: { translation: vi },
  ja: { translation: ja },
  ko: { translation: ko },
  'zh-CN': { translation: zhCN },
  'zh-TW': { translation: zhTW },
  de: { translation: de },
  fr: { translation: fr },
  es: { translation: es },
  'pt-BR': { translation: ptBR },
  it: { translation: it },
  nl: { translation: nl },
  ar: { translation: ar },
  hi: { translation: hi },
  tr: { translation: tr },
  pl: { translation: pl },
  th: { translation: th },
  id: { translation: id },
};

export const languages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'zh-CN', name: 'Chinese (Simplified)', nativeName: '简体中文', flag: '🇨🇳' },
  { code: 'zh-TW', name: 'Chinese (Traditional)', nativeName: '繁體中文', flag: '🇹🇼' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'pt-BR', name: 'Portuguese (Brazil)', nativeName: 'Português (Brasil)', flag: '🇧🇷' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', rtl: true },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩' },
];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'gnote-landing-i18nextLng',
    },
  });

export default i18n;
