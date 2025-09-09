import React, { useState, useEffect } from 'react';
import { ImageIcon, Home, Building, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const SmartImage = ({ 
  src, 
  alt = 'Property Image', 
  className = '', 
  fallbackIcon: FallbackIcon = ImageIcon,
  showLoader = true,
  ...props 
}) => {
  const [imageState, setImageState] = useState('loading');
  const [imageSrc, setImageSrc] = useState('');
  
  // Fallback image sources to try
  const fallbackImages = [
    `${import.meta.env.BASE_URL}placeholder-property.svg`,
    'https://via.placeholder.com/800x600/f1f5f9/64748b?text=Property+Image'
  ];

  useEffect(() => {
    if (!src) {
      setImageState('error');
      return;
    }

    setImageState('loading');
    
    // Create a new image element to test loading
    const img = new Image();
    
    // Add a timeout for slow-loading images
    const timeout = setTimeout(() => {
      if (imageState === 'loading') {
        console.warn('Image loading timeout:', src);
        setImageState('error');
      }
    }, 10000); // 10 second timeout

    img.onload = () => {
      clearTimeout(timeout);
      setImageSrc(src);
      setImageState('loaded');
    };

    img.onerror = () => {
      clearTimeout(timeout);
      console.error('Image failed to load:', src);
      setImageState('error');
    };

    // Start loading the image
    img.src = src;

    return () => {
      clearTimeout(timeout);
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  // Loading state
  if (imageState === 'loading' && showLoader) {
    return (
      <div className={cn(
        "flex items-center justify-center bg-muted animate-pulse",
        className
      )} {...props}>
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <div className="w-8 h-8 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span className="text-xs">Loading...</span>
        </div>
      </div>
    );
  }

  // Error state or fallback
  if (imageState === 'error' || !src) {
    return (
      <div className={cn(
        "flex items-center justify-center bg-gradient-to-br from-muted to-muted/70",
        className
      )} {...props}>
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <FallbackIcon className="w-12 h-12" />
          <span className="text-xs text-center px-2">{alt}</span>
        </div>
      </div>
    );
  }

  // Successfully loaded image
  return (
    <img 
      src={imageSrc}
      alt={alt}
      className={cn("object-cover", className)}
      loading="lazy"
      {...props}
    />
  );
};

// Specialized property image component
export const PropertyImage = ({ 
  src, 
  alt = 'Property Image', 
  propertyType = 'apartment',
  className = '',
  ...props 
}) => {
  // Choose appropriate fallback icon based on property type
  const getFallbackIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'apartment':
      case 'flat':
        return Building;
      case 'villa':
      case 'house':
      case 'bungalow':
        return Home;
      case 'penthouse':
        return Building;
      default:
        return Home;
    }
  };

  return (
    <SmartImage
      src={src}
      alt={alt}
      fallbackIcon={getFallbackIcon(propertyType)}
      className={className}
      {...props}
    />
  );
};

export default SmartImage;
