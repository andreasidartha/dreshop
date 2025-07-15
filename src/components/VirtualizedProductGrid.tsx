import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { useIntersectionObserver } from '@/hooks/usePerformance';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number | null;
  rating: number;
  reviews: number;
  image: string;
  badge: string | null;
  isNew: boolean;
  category?: string;
  brand?: string;
}

interface VirtualizedProductGridProps {
  products: Product[];
  viewMode?: 'grid' | 'list';
  className?: string;
}

const VirtualizedProductGrid = ({ 
  products, 
  viewMode = 'grid',
  className = ''
}: VirtualizedProductGridProps) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const { elementRef: containerRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px'
  });

  // Calculate grid layout
  const gridConfig = useMemo(() => {
    if (viewMode === 'list') {
      return {
        itemSize: 120, // Height of list item
        columns: 1
      };
    }
    
    // Responsive grid columns
    return {
      itemSize: 400, // Height of grid item
      columns: window.innerWidth < 768 ? 1 : 
               window.innerWidth < 1024 ? 2 : 
               window.innerWidth < 1280 ? 3 : 4
    };
  }, [viewMode]);

  // Create virtualized rows
  const rowVirtualizer = useVirtualizer({
    count: Math.ceil(products.length / gridConfig.columns),
    getScrollElement: () => parentRef.current,
    estimateSize: () => gridConfig.itemSize,
    overscan: 5, // Number of items to render outside viewport
  });

  // Get products for a specific row
  const getRowProducts = (rowIndex: number) => {
    const startIndex = rowIndex * gridConfig.columns;
    return products.slice(startIndex, startIndex + gridConfig.columns);
  };

  if (!hasIntersected) {
    return (
      <div ref={containerRef} className="h-96 flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={parentRef}
      className={`h-full overflow-auto ${className}`}
      style={{ 
        height: 'calc(100vh - 200px)',
        contain: 'strict' // CSS containment for performance
      }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const rowProducts = getRowProducts(virtualRow.index);
          
          return (
            <motion.div
              key={virtualRow.index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`grid gap-4 ${
                viewMode === 'list' 
                  ? 'grid-cols-1' 
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              }`}
            >
              {rowProducts.map((product, index) => (
                <div key={product.id} className="h-full">
                  <ProductCard
                    product={product}
                    index={virtualRow.index * gridConfig.columns + index}
                    viewMode={viewMode}
                  />
                </div>
              ))}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default VirtualizedProductGrid; 