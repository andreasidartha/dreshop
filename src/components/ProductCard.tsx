import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/stores/useStore";
import ProductQuickView from "./ProductQuickView";
import OptimizedImage from "./OptimizedImage";

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

interface ProductCardProps {
  product: Product;
  index: number;
  viewMode?: "grid" | "list";
}

const ProductCard = ({ product, index, viewMode = "grid" }: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const navigate = useNavigate();
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist, addRecentlyViewed } = useStore();

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleProductClick = () => {
    addRecentlyViewed(product);
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleToggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
    setIsLiked(!isLiked);
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const heartVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.2 },
    tap: { scale: 0.9 },
    liked: {
      scale: [1, 1.3, 1],
      transition: {
        duration: 0.3
      }
    }
  };

  if (viewMode === "list") {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleProductClick}
        whileHover={{ 
          y: -3,
          transition: { duration: 0.2, ease: "easeOut" }
        }}
      >
        <div className="flex p-6">
          <div className="relative w-32 h-32 flex-shrink-0">
            <OptimizedImage
              src={`https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=300&q=80`}
              alt={product.name}
              width={128}
              height={128}
              className="w-full h-full object-cover rounded-lg"
              priority={index < 8} // Prioritize first 8 images in list view
            />
            
            <AnimatePresence>
              {product.badge && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Badge className={`absolute top-2 left-2 text-xs ${
                    product.badge === "New" ? "bg-green-500" :
                    product.badge === "Best Seller" ? "bg-orange-500" :
                    product.badge === "Limited" ? "bg-purple-500" :
                    "bg-red-500"
                  }`}>
                    {product.badge}
                  </Badge>
                </motion.div>
              )}
            </AnimatePresence>
            
            {discount > 0 && (
              <motion.div
                initial={{ opacity: 0, rotate: -180 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Badge className="absolute top-2 right-2 bg-red-500 text-xs">
                  -{discount}%
                </Badge>
              </motion.div>
            )}
          </div>

          <div className="flex-1 ml-6 flex flex-col justify-between">
            <div>
              <motion.div 
                className="flex text-yellow-400 mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, rotate: -180 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className={i < Math.floor(product.rating) ? "★" : "☆"}
                  >
                    ★
                  </motion.span>
                ))}
                <span className="text-sm text-muted-foreground ml-2">
                  {product.rating} ({product.reviews})
                </span>
              </motion.div>
              
              <motion.h4
                className="font-semibold text-xl mb-2 group-hover:text-primary transition-colors duration-200"
                whileHover={{ x: 5 }}
              >
                {product.name}
              </motion.h4>
              
              {product.category && (
                <motion.p
                  className="text-sm text-muted-foreground mb-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {product.category}
                </motion.p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <motion.div
                className="flex items-center space-x-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <span className="text-2xl font-bold text-primary">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </motion.div>
              
              <motion.div
                className="flex space-x-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.div
                  variants={heartVariants}
                  animate={isLiked ? "liked" : "rest"}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleToggleLike}
                    className={`transition-colors duration-200 ${
                      isLiked ? "bg-red-50 text-red-500 border-red-200" : ""
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="sm"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="group relative bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-border/50 hover:border-primary/30 will-change-transform"
      whileHover="hover"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="relative overflow-hidden">
        <OptimizedImage
          src={`https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=600&q=80`}
          alt={product.name}
          width={600}
          height={256}
          className="w-full h-64 object-cover group-hover:brightness-110 transition-all duration-200 will-change-transform"
          priority={index < 4} // Prioritize first 4 images
        />
        
          {product.badge && (
          <Badge className={`absolute top-4 left-4 shadow-lg ${
            product.badge === "New" ? "bg-gradient-to-r from-green-500 to-emerald-500" :
            product.badge === "Best Seller" ? "bg-gradient-to-r from-orange-500 to-red-500" :
            product.badge === "Limited" ? "bg-gradient-to-r from-purple-500 to-pink-500" :
            "bg-gradient-to-r from-red-500 to-pink-500"
              }`}>
                {product.badge}
              </Badge>
          )}
        
        {discount > 0 && (
          <Badge className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 shadow-lg">
              -{discount}%
            </Badge>
        )}
        
        {/* Hover Actions */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-black/20 flex items-center justify-center space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.1 }}
              >
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowQuickView(true);
                  }}
                  className="bg-white/90 hover:bg-white"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Quick View
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.button
          onClick={handleToggleLike}
          className={`absolute bottom-4 right-4 p-2 rounded-full transition-all duration-300 ${
            isLiked ? "bg-red-500 text-white" : "bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white"
          }`}
          variants={heartVariants}
          animate={isLiked ? "liked" : "rest"}
          whileHover="hover"
          whileTap="tap"
          initial={{ opacity: 0, scale: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
          style={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0,
          }}
        >
          <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
        </motion.button>
      </div>
      
      <div className="p-6">
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={i < Math.floor(product.rating) ? "★" : "☆"}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-sm text-muted-foreground ml-2">
            {product.rating} ({product.reviews})
          </span>
        </div>
        
        <motion.h4
          className="font-semibold text-lg mb-3 group-hover:text-primary transition-colors duration-200"
          whileHover={{ x: 5 }}
        >
          {product.name}
        </motion.h4>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">${product.price}</span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="sm"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Quick View Modal */}
      <ProductQuickView
        product={product}
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
      />
    </motion.div>
  );
};

export default ProductCard;
