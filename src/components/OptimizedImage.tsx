import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useImageOptimization, useIntersectionObserver } from '@/hooks/usePerformance';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  priority?: boolean;
  placeholder?: string;
}

const OptimizedImage = ({
  src,
  alt,
  className = '',
  width = 400,
  height = 400,
  quality = 80,
  priority = false,
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5YWFhYSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+'
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholder);
  const imgRef = useRef<HTMLImageElement>(null);
  
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px'
  });

  // Optimize image URL with parameters
  const getOptimizedSrc = (originalSrc: string) => {
    if (!originalSrc) return placeholder;
    
    try {
      const url = new URL(originalSrc);
      url.searchParams.set('w', width.toString());
      url.searchParams.set('h', height.toString());
      url.searchParams.set('q', quality.toString());
      url.searchParams.set('fit', 'crop');
      url.searchParams.set('auto', 'format');
      return url.toString();
    } catch {
      return originalSrc;
    }
  };

  useEffect(() => {
    if (!isIntersecting && !priority) return;

    const optimizedSrc = getOptimizedSrc(src);
    setCurrentSrc(optimizedSrc);
  }, [isIntersecting, src, priority, width, height, quality]);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(false);
    setCurrentSrc(placeholder);
  };

  // Preload image if priority
  useEffect(() => {
    if (priority && src) {
      const img = new Image();
      img.onload = () => {
        setCurrentSrc(getOptimizedSrc(src));
        setIsLoaded(true);
      };
      img.onerror = handleError;
      img.src = src;
    }
  }, [priority, src]);

  return (
    <div 
      ref={elementRef}
      className={`relative overflow-hidden ${className}`}
      style={{ 
        width: `${width}px`, 
        height: `${height}px`,
        contain: 'layout style paint' // CSS containment for performance
      }}
    >
      {/* Blur placeholder */}
      {!isLoaded && !hasError && (
        <motion.div
          key="placeholder"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse"
          style={{
            backgroundImage: `url(${placeholder})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(10px)'
          }}
        />
      )}

      {/* Main image */}
      <motion.img
        key="main-image"
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        className={`w-full h-full object-cover ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        style={{
          willChange: 'opacity',
          transform: 'translateZ(0)' // Force hardware acceleration
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Error state */}
      {hasError && (
        <motion.div
          key="error-state"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-gray-100"
        >
          <div className="text-center text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">Image not available</p>
          </div>
        </motion.div>
      )}

      {/* Loading indicator */}
      {!isLoaded && !hasError && (
        <motion.div
          key="loading-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20"
        >
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </motion.div>
      )}
    </div>
  );
};

export default OptimizedImage; 