import { motion } from "framer-motion";
import { Users, Package, Star, Truck } from "lucide-react";

const StatsBanner = () => {
  const stats = [
    {
      icon: Users,
      number: "50K+",
      label: "Happy Customers",
      color: "text-blue-500"
    },
    {
      icon: Package,
      number: "10K+",
      label: "Products Sold",
      color: "text-green-500"
    },
    {
      icon: Star,
      number: "4.9",
      label: "Average Rating",
      color: "text-yellow-500"
    },
    {
      icon: Truck,
      number: "24/7",
      label: "Fast Delivery",
      color: "text-purple-500"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-primary/5 via-purple-500/5 to-primary/5">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, staggerChildren: 0.2 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className={`w-16 h-16 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 ${stat.color}`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon className="w-8 h-8" />
              </motion.div>
              
              <motion.div
                className="text-3xl font-bold text-primary mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 200 }}
              >
                {stat.number}
              </motion.div>
              
              <div className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsBanner; 