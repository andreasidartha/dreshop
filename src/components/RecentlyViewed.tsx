import { motion } from "framer-motion";
import { useStore } from "@/stores/useStore";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { Eye, X } from "lucide-react";

const RecentlyViewed = () => {
  const { recentlyViewed, clearRecentlyViewed } = useStore();

  if (recentlyViewed.length === 0) return null;

  return (
    <section className="py-16 bg-gradient-to-br from-background via-muted/20 to-primary/5">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <Eye className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Recently Viewed
            </h2>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={clearRecentlyViewed}
            className="flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Clear All
          </Button>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          {recentlyViewed.map((product, index) => (
            <motion.div
              key={`${product.id}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProductCard
                product={product}
                index={index}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default RecentlyViewed; 