// src/Components/GoogleTranslate.jsx
import React, { useEffect, useRef } from 'react';

// Define the callback function globally ONCE.
// It will be called by the Google script when it's ready.
if (typeof window.googleTranslateElementInit !== 'function') {
  window.googleTranslateElementInit = function() {
    console.log("Google Translate is ready, attempting init..."); // DEBUG
    try {
      const element = document.getElementById('google_translate_element');
      // Initialize only if the element exists AND hasn't been initialized already
      if (element && !element.hasChildNodes() && window.google && window.google.translate) {
        console.log("Initializing Google Translate widget inside callback."); // DEBUG
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,hi,bn,te,mr,ta,ur,gu,kn,or,ml,pa',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false
          },
          'google_translate_element'
        );
      } else {
         console.log("Skipping GT init inside callback - element missing, already init, or google object not ready."); // DEBUG
      }
    } catch (error) {
      console.error("Error executing googleTranslateElementInit:", error);
    }
  };
}


const GoogleTranslate = () => {
  const scriptInjected = useRef(false);

  useEffect(() => {
    // Only add the script if it hasn't been added anywhere in the app yet.
    if (!scriptInjected.current && !document.getElementById('google-translate-script')) {
        console.log("Injecting Google Translate script..."); // DEBUG
        const script = document.createElement('script');
        script.id = 'google-translate-script';
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        script.onerror = () => console.error("Failed to load Google Translate script.");
        document.body.appendChild(script);
        scriptInjected.current = true;
    }
    // No other logic needed here. The callback handles initialization.
  }, []); // Empty dependency array ensures this runs only once per component mount

  return (
    <div id="google_translate_element_container" className="relative z-[1001] inline-block align-middle">
        {/* The div the widget will attach to */}
        <div id="google_translate_element"></div>
    </div>
  );
};

export default GoogleTranslate;