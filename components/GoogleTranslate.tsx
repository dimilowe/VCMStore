"use client";

import { useEffect, useState } from 'react';
import { Globe } from 'lucide-react';

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

export default function GoogleTranslate() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const addGoogleTranslateScript = () => {
      if (document.getElementById('google-translate-script')) {
        setIsLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.type = 'text/javascript';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    };

    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            autoDisplay: false,
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          'google_translate_element'
        );
        setIsLoaded(true);
      }
    };

    addGoogleTranslateScript();
  }, []);

  return (
    <div className="relative flex items-center gap-1.5">
      <Globe className="w-4 h-4 text-gray-500" />
      <div 
        id="google_translate_element" 
        className="google-translate-container"
      />
      <style jsx global>{`
        .google-translate-container .goog-te-gadget {
          font-family: inherit !important;
          font-size: 0 !important;
        }
        .google-translate-container .goog-te-gadget > span {
          display: none !important;
        }
        .google-translate-container .goog-te-gadget-simple {
          background-color: transparent !important;
          border: none !important;
          padding: 0 !important;
          font-size: 14px !important;
          line-height: 1.5 !important;
          display: flex !important;
          align-items: center !important;
        }
        .google-translate-container .goog-te-gadget-simple .goog-te-menu-value {
          color: #4b5563 !important;
          font-size: 14px !important;
        }
        .google-translate-container .goog-te-gadget-simple .goog-te-menu-value span:first-child {
          display: none !important;
        }
        .google-translate-container .goog-te-gadget-simple .goog-te-menu-value span[style] {
          margin-left: 0 !important;
          border: none !important;
          color: #9ca3af !important;
        }
        .google-translate-container .goog-te-gadget-icon {
          display: none !important;
        }
        body {
          top: 0 !important;
        }
        .goog-te-banner-frame {
          display: none !important;
        }
        .skiptranslate {
          display: none !important;
        }
        body > .skiptranslate {
          display: none !important;
        }
        .goog-te-spinner-pos {
          display: none !important;
        }
      `}</style>
    </div>
  );
}
