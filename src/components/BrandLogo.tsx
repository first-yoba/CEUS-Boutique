import React from 'react';

interface BrandLogoProps {
  variant?: 'full' | 'monogram' | 'wordmark';
  className?: string;
  imageClassName?: string;
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'full',
  className = '',
  imageClassName = 'h-12 w-auto',
  showSubtitle = false,
}) => {
  const [imgSrc, setImgSrc] = React.useState<string>('/logo.png');
  const [hasError, setHasError] = React.useState(false);

  // Fallback chain for logo images if user uploads differently named assets
  const fallbackImages = [
    '/logo.png',
    '/ceus-logo.png',
    '/ChatGPT Image Sep 1, 2026, 03_24_44 PM.png',
    '/logo.jpg',
    '/logo.svg',
    '/ceus-logo.svg',
  ];

  const handleImageError = () => {
    const currentIndex = fallbackImages.indexOf(imgSrc);
    if (currentIndex < fallbackImages.length - 1) {
      setImgSrc(fallbackImages[currentIndex + 1]);
    } else {
      setHasError(true);
    }
  };

  return (
    <div className={`inline-flex flex-col items-center justify-center ${className}`}>
      {!hasError ? (
        <img
          src={imgSrc}
          alt="CÉUS Haute Couture"
          onError={handleImageError}
          className={`${imageClassName} object-contain transition-transform duration-300`}
          referrerPolicy="no-referrer"
        />
      ) : (
        /* Vector Fallback if image fails to load */
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center space-x-1">
            <span className="font-editorial text-3xl sm:text-4xl text-[#1C1917] tracking-[0.35em] font-light pl-[0.35em]">
              CÉUS
            </span>
          </div>
        </div>
      )}
      
      {showSubtitle && (
        <span className="text-[8px] tracking-[0.55em] uppercase text-[#8C7355] font-sans-clean font-semibold mt-1 pl-[0.55em]">
          HAUTE COUTURE
        </span>
      )}
    </div>
  );
};
