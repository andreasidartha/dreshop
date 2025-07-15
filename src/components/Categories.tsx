
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const categories = [
  { name: "Electronics", count: "150+ items", image: "photo-1721322800607-8c38375eef04", filter: "Electronics", icon: "💻" },
  { name: "Fashion", count: "200+ items", image: "photo-1582562124811-c09040d0a901", filter: "Fashion", icon: "👗" },
  { name: "Home & Garden", count: "180+ items", image: "photo-1523712999610-f77fbcfc3843", filter: "Home", icon: "🏠" },
  { name: "Sports", count: "120+ items", image: "photo-1500673922987-e212871fec22", filter: "Sports", icon: "⚽" },
];

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/shop?category=${category.filter}`);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-background via-muted/20 to-primary/5">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Shop by Category
          </h3>
          <p className="text-muted-foreground text-lg">Discover our wide range of premium products at DreShop</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCategoryClick(category)}
            >
              <div className="relative overflow-hidden rounded-2xl bg-card shadow-lg hover:shadow-2xl transition-all duration-500 border border-border/50 hover:border-primary/30">
                <img
                  src={`https://images.unsplash.com/${category.image}?auto=format&fit=crop&w=400&q=80`}
                  alt={category.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{category.icon}</span>
                  <h4 className="text-lg font-semibold group-hover:scale-105 transition-transform duration-200">{category.name}</h4>
                  </div>
                  <p className="text-sm opacity-90">{category.count}</p>
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.div 
                    className="bg-white/95 text-primary dark:bg-zinc-900/90 dark:text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg"
                    whileHover={{ scale: 1.05 }}
                  >
                    Shop Now
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
