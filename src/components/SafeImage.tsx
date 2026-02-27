import React, { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({ src, alt, className, fallbackText, ...props }) => {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className={`bg-wedding-light flex items-center justify-center text-wedding-gray text-xs uppercase tracking-widest p-8 text-center ${className}`}>
        {fallbackText || alt || 'Image not found'}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      loading="lazy"
      {...props}
    />
  );
};

