import React, { useEffect } from 'react';

const GoogleTranslate = () => {
  useEffect(() => {
    // Define the callback function that Google's script will call
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          // Only show major Indian languages
          includedLanguages: 'en,hi,bn,te,mr,ta,ur,gu,kn,or,ml,pa',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        'google_translate_element'
      );
    };

    // Check if the script already exists to prevent duplicate loading
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(script);
    }
  }, []);

  return (
    // The container is styled with Tailwind CSS for the black background theme
    <div className="bg-black rounded-md p-1">
      <div id="google_translate_element"></div>
    </div>
  );
};

export default GoogleTranslate;