
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviews: 124,
    image: "photo-1618160702438-9b02ab6515c9",
    badge: "Best Seller",
    isNew: false,
    category: "Electronics",
    brand: "DreAudio"
  },
  {
    id: 2,
    name: "Smart Home Speaker",
    price: 199,
    originalPrice: null,
    rating: 4.6,
    reviews: 89,
    image: "photo-1721322800607-8c38375eef04",
    badge: "New",
    isNew: true,
    category: "Electronics",
    brand: "DreTech"
  },
  {
    id: 3,
    name: "Luxury Watch Collection",
    price: 899,
    originalPrice: 1199,
    rating: 4.9,
    reviews: 67,
    image: "photo-1582562124811-c09040d0a901",
    badge: "Limited",
    isNew: false,
    category: "Fashion",
    brand: "DreStyle"
  },
  {
    id: 4,
    name: "Professional Camera",
    price: 1299,
    originalPrice: null,
    rating: 4.7,
    reviews: 156,
    image: "photo-1523712999610-f77fbcfc3843",
    badge: null,
    isNew: false,
    category: "Electronics",
    brand: "DrePhoto"
  },
  {
    id: 5,
    name: "Gaming Console",
    price: 499,
    originalPrice: 599,
    rating: 4.8,
    reviews: 234,
    image: "photo-1500673922987-e212871fec22",
    badge: "Hot Deal",
    isNew: false,
    category: "Electronics",
    brand: "DreGaming"
  },
  {
    id: 6,
    name: "Wireless Earbuds Pro",
    price: 179,
    originalPrice: null,
    rating: 4.5,
    reviews: 98,
    image: "photo-1649972904349-6e44c42644a7",
    badge: "New",
    isNew: true,
    category: "Electronics",
    brand: "DreAudio"
  },
  {
    id: 7,
    name: "Designer Sunglasses",
    price: 249,
    originalPrice: 349,
    rating: 4.7,
    reviews: 78,
    image: "photo-1572635196237-14b3f281503f",
    badge: "Trending",
    isNew: false,
    category: "Fashion",
    brand: "DreStyle"
  },
  {
    id: 8,
    name: "Smart Fitness Watch",
    price: 399,
    originalPrice: 499,
    rating: 4.6,
    reviews: 145,
    image: "photo-1544117519-31a4b719223d",
    badge: "Best Seller",
    isNew: false,
    category: "Sports",
    brand: "DreFit"
  }
];

const ProductGrid = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div 
          className="flex justify-between items-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div>
            <h3 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Featured Products
            </h3>
            <p className="text-muted-foreground text-lg">Discover our handpicked selection of premium products</p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
          <Button 
            variant="outline"
            onClick={() => navigate("/shop")}
              className="hover:bg-primary hover:text-primary-foreground transition-colors duration-200 group border-2 hover:border-primary"
          >
            View All Products
            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
          </Button>
          </motion.div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
