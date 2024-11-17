import React, { useEffect } from "react";

const GoogleTranslate = () => {
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      if (window.google && window.google.translate) return;

      const scriptId = "google-translate-script";
      if (!document.getElementById(scriptId)) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.type = "text/javascript";
        script.async = true;
        script.src =
          "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        document.body.appendChild(script);

        window.googleTranslateElementInit = () => {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en", // Default page language
              includedLanguages: "hi,te,ta,kn,ml,gu,bn,mr,pa,en", // Languages available for translation
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE, // Widget layout
              autoDisplay: false, // Prevent automatic display  
            },
            "google_translate_element" // ID of the container for the widget
          );
        };
      }
    };

    addGoogleTranslateScript();
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <div
        id="google_translate_element"
        className="w-50 max-w-sm border border-gray-300 rounded-lg shadow-md p-2 mt-2 bg-blue-500 text-center"
      />
    </div>
  );
};

export default GoogleTranslate;
