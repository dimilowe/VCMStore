"use client";

import { useEffect, useState, useRef } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

export default function GoogleTranslate() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
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
    const addGoogleTranslateScript = () => {
      if (document.getElementById('google-translate-script')) {
        setIsLoaded(true);
        return;
      }

      window.googleTranslateElementInit = () => {
        if (window.google && window.google.translate) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              autoDisplay: false,
              includedLanguages: 'en,es,fr,de,it,pt,zh-CN,zh-TW,ja,ko,ar,hi,ru,nl,pl,sv,tr,vi,th,id,ms,tl',
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            },
            'google_translate_element'
          );
          setIsLoaded(true);
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

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 hover:text-orange-500 hover:bg-gray-50 rounded-lg transition-colors"
        title="Translate this page"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden lg:inline text-xs font-medium">Translate</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <div 
        className={`absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-4 min-w-[220px] ${isOpen ? 'block' : 'hidden'}`}
      >
        <p className="text-xs text-gray-500 mb-3">Select your language:</p>
        <div 
          id="google_translate_element" 
          className="google-translate-wrapper"
        />
        {!isLoaded && (
          <p className="text-xs text-gray-400 mt-2">Loading languages...</p>
        )}
      </div>

      <style jsx global>{`
        .google-translate-wrapper .goog-te-gadget {
          font-family: inherit !important;
          font-size: 14px !important;
        }
        .google-translate-wrapper .goog-te-gadget > span {
          display: none !important;
        }
        .google-translate-wrapper .goog-te-gadget-simple {
          background-color: #f9fafb !important;
          border: 1px solid #e5e7eb !important;
          border-radius: 8px !important;
          padding: 10px 14px !important;
          font-size: 14px !important;
          line-height: 1.5 !important;
          display: flex !important;
          align-items: center !important;
          cursor: pointer !important;
          width: 100% !important;
        }
        .google-translate-wrapper .goog-te-gadget-simple:hover {
          border-color: #f97316 !important;
          background-color: #fff7ed !important;
        }
        .google-translate-wrapper .goog-te-gadget-simple .goog-te-menu-value {
          color: #374151 !important;
          font-size: 14px !important;
        }
        .google-translate-wrapper .goog-te-gadget-simple .goog-te-menu-value span:first-child {
          display: none !important;
        }
        .google-translate-wrapper .goog-te-gadget-simple .goog-te-menu-value span[style] {
          margin-left: 4px !important;
          border: none !important;
          color: #9ca3af !important;
        }
        .google-translate-wrapper .goog-te-gadget-icon {
          display: none !important;
        }
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
      `}</style>
    </div>
  );
}
