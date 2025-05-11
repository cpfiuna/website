import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const COOKIE_CONSENT_KEY = "cookie-consent-v1";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!hasConsent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/80 backdrop-blur-sm border-t border-border">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-between gap-4">
          <div className="text-sm">
            <p className="mb-1">
              Este sitio utiliza cookies y tecnologías similares para mejorar su experiencia.
              Ver nuestra <Link to="/privacy" className="text-primary hover:underline">política de privacidad</Link>.
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <button 
              onClick={acceptCookies}
              className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Aceptar cookies
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Cerrar aviso de cookies"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;