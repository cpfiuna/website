import React, { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
  imageIndex?: number;
  totalImages?: number;
  allImages?: string[];
  onNavigate?: (direction: 'prev' | 'next') => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
  imageIndex,
  totalImages,
  allImages,
  onNavigate,
}) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowLeft" && onNavigate && totalImages !== undefined && totalImages > 1) {
      onNavigate('prev');
    } else if (e.key === "ArrowRight" && onNavigate && totalImages !== undefined && totalImages > 1) {
      onNavigate('next');
    }
  };

  const showNavigation = totalImages !== undefined && totalImages > 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm overflow-auto"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className="relative max-w-[95vw] max-h-[95vh] p-4 my-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 z-20 bg-background/70 hover:bg-background/90 text-foreground border border-border rounded-full p-2 transition-colors shadow-lg backdrop-blur-sm"
          aria-label="Cerrar imagen"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Previous button */}
        {showNavigation && onNavigate && (
          <button
            onClick={() => onNavigate('prev')}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-background/70 hover:bg-background/90 text-foreground border border-border rounded-full p-3 transition-colors shadow-lg backdrop-blur-sm"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        {/* Next button */}
        {showNavigation && onNavigate && (
          <button
            onClick={() => onNavigate('next')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-background/70 hover:bg-background/90 text-foreground border border-border rounded-full p-3 transition-colors shadow-lg backdrop-blur-sm"
            aria-label="Siguiente imagen"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}

        {/* Image counter */}
        {imageIndex !== undefined && totalImages !== undefined && totalImages > 1 && (
          <div className="absolute top-4 left-4 bg-background/70 text-foreground border border-border px-3 py-1 rounded-full text-sm shadow-lg backdrop-blur-sm">
            {imageIndex + 1} de {totalImages}
          </div>
        )}

        {/* Main image container - scrollable */}
        <div className="relative bg-black/20 rounded-lg overflow-auto max-h-[90vh]">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="max-w-full h-auto object-contain rounded-lg shadow-2xl block mx-auto"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg";
            }}
          />
        </div>

        {/* Image description */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-background/70 text-foreground border border-border px-4 py-2 rounded-full text-sm max-w-[80%] text-center shadow-lg backdrop-blur-sm">
          {imageAlt}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
