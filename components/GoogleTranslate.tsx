"use client";

import { useEffect, useState, useRef } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'zh-CN', name: '中文 (简体)', flag: '🇨🇳' },
  { code: 'zh-TW', name: '中文 (繁體)', flag: '🇹🇼' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'ms', name: 'Bahasa Melayu', flag: '🇲🇾' },
  { code: 'tl', name: 'Tagalog', flag: '🇵🇭' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
];

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

export default function GoogleTranslate() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');
  const [isTranslating, setIsTranslating] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const match = document.cookie.match(/googtrans=\/[^/]+\/([^;]+)/);
    if (match) {
      setCurrentLang(match[1]);
    }

    const addGoogleTranslateScript = () => {
      if (document.getElementById('google-translate-script')) {
        return;
      }

      window.googleTranslateElementInit = () => {
        if (window.google && window.google.translate) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              autoDisplay: false,
              includedLanguages: languages.map(l => l.code).join(','),
            },
            'google_translate_hidden'
          );
        }
      };

      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.type = 'text/javascript';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    };

    addGoogleTranslateScript();
  }, []);

  const selectLanguage = (langCode: string) => {
    setIsTranslating(true);
    setCurrentLang(langCode);
    
    document.cookie = `googtrans=/en/${langCode}; path=/`;
    document.cookie = `googtrans=/en/${langCode}; path=/; domain=${window.location.hostname}`;
    
    setIsOpen(false);
    
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const currentLanguage = languages.find(l => l.code === currentLang) || languages[0];

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 hover:text-orange-500 hover:bg-gray-50 rounded-lg transition-colors"
        title="Translate this page"
        disabled={isTranslating}
      >
        <Globe className="w-4 h-4" />
        <span className="hidden lg:inline text-xs font-medium">
          {isTranslating ? 'Translating...' : currentLanguage.flag}
        </span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-[100] min-w-[200px] max-h-[400px] overflow-y-auto">
          <div className="p-2 border-b border-gray-100">
            <p className="text-xs text-gray-500 px-2">Select language</p>
          </div>
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => selectLanguage(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-orange-50 transition-colors ${
                  currentLang === lang.code ? 'bg-orange-50 text-orange-600' : 'text-gray-700'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="text-sm font-medium flex-1">{lang.name}</span>
                {currentLang === lang.code && (
                  <Check className="w-4 h-4 text-orange-500" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      <div id="google_translate_hidden" className="hidden" />

      <style jsx global>{`
        body {
          top: 0 !important;
        }
        .goog-te-banner-frame {
          display: none !important;
        }
        iframe.skiptranslate {
          display: none !important;
        }
        .goog-te-spinner-pos {
          display: none !important;
        }
        #goog-gt-tt {
          display: none !important;
        }
        .goog-te-balloon-frame {
          display: none !important;
        }
        .goog-text-highlight {
          background: none !important;
          box-shadow: none !important;
        }
        .VIpgJd-ZVi9od-ORHb-OEVmcd {
          display: none !important;
        }
        .VIpgJd-ZVi9od-l4eHX-hSRGPd {
          display: none !important;
        }
      `}</style>
    </div>
  );
}
