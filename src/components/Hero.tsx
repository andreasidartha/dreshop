
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const navigate = useNavigate();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleShopNow = () => {
    navigate("/shop");
  };

  const handleViewCollection = () => {
    navigate("/shop?filter=new");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted/20 to-primary/5">
      {/* Animated background elements */}
      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity
        }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.6, 0.3, 0.6],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: 2
        }}
      />

      <div className="container mx-auto px-4 py-20 md:py-32 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="space-y-4">
              <motion.span
                variants={itemVariants}
                className="inline-block px-4 py-2 bg-gradient-to-r from-primary/20 to-purple-500/20 text-primary rounded-full text-sm font-medium hover:from-primary/30 hover:to-purple-500/30 transition-all duration-300 cursor-default border border-primary/20"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                ✨ New Collection 2024 ✨
              </motion.span>
              
              <motion.h2
                variants={itemVariants}
                className="text-4xl md:text-6xl font-bold leading-tight"
              >
                Discover
                <motion.span
                  className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent inline-block ml-2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Premium
                </motion.span>
                <br />
                <motion.span
                  className="bg-gradient-to-r from-purple-600 to-primary bg-clip-text text-transparent"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Products
                </motion.span>
              </motion.h2>
              
              <motion.p
                variants={itemVariants}
                className="text-xl text-muted-foreground leading-relaxed"
              >
                Experience the future of shopping with DreShop's curated collection of premium products designed for the modern lifestyle. Quality meets innovation.
              </motion.p>
            </div>
            
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button 
                  size="lg" 
                  onClick={handleShopNow}
                  className="group bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary"
                >
                  Shop Now
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity
                    }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={handleViewCollection}
                  className="hover:bg-primary/5 transition-colors duration-200 group border-2 hover:border-primary"
                >
                  <motion.div
                    className="mr-2"
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Play className="w-4 h-4" />
                  </motion.div>
                  View Collection
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              className="flex items-center space-x-8 pt-8"
            >
              {[
                { number: "15K+", label: "Happy Customers", icon: "👥" },
                { number: "1000+", label: "Premium Products", icon: "✨" },
                { number: "99.9%", label: "Satisfaction Rate", icon: "⭐" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={statsVariants}
                  className="text-center group cursor-default"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="text-2xl font-bold text-primary flex items-center gap-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1 + index * 0.2, type: "spring", stiffness: 200 }}
                  >
                    <span className="text-lg">{stat.icon}</span>
                    {stat.number}
                  </motion.div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-3xl blur-3xl opacity-30"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity
              }}
            />
            
            <motion.div
              className="relative bg-card rounded-3xl p-8 shadow-2xl border backdrop-blur-sm group"
              whileHover={{ 
                y: -10,
                rotateY: 5,
                transition: { type: "spring", stiffness: 300 }
              }}
            >
              <div className="relative overflow-hidden rounded-2xl">
                <motion.img
                  src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80"
                  alt="Featured Product"
                  className="w-full h-80 object-cover cursor-pointer"
                  onClick={() => navigate("/product/1")}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
                
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                
                <motion.div
                  className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium"
                  animate={{
                    y: [0, -4, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                >
                  Featured
                </motion.div>
                
                <motion.button 
                  onClick={() => navigate("/product/1")}
                  className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-primary p-3 rounded-full shadow-lg"
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  whileHover={{ 
                    opacity: 1, 
                    scale: 1.1, 
                    rotate: 0,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  animate={{ 
                    opacity: 0, 
                    scale: 0.8, 
                    rotate: -90 
                  }}
                  whileInView={{ 
                    opacity: [0, 1], 
                    scale: [0.8, 1], 
                    rotate: [-90, 0] 
                  }}
                  transition={{ duration: 0.5, delay: 1.5 }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
