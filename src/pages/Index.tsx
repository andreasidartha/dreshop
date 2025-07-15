
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import Categories from "@/components/Categories";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import StatsBanner from "@/components/StatsBanner";
import RecentlyViewed from "@/components/RecentlyViewed";
import { motion } from "framer-motion";
import { Shield, Truck, RefreshCw, CreditCard } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Shield,
      title: "Secure Shopping",
      description: "Your data is protected with bank-level security"
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Free shipping on orders over $50"
    },
    {
      icon: RefreshCw,
      title: "Easy Returns",
      description: "30-day hassle-free return policy"
    },
    {
      icon: CreditCard,
      title: "Multiple Payment",
      description: "Pay with cards, PayPal, or crypto"
    }
  ];

  return (
    <>
      <Hero />
      <StatsBanner />
      <Categories />
      <ProductGrid />
      
      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-background via-muted/20 to-primary/5">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Why Choose DreShop?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We're committed to providing you with the best shopping experience possible
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <Testimonials />
      <RecentlyViewed />
      <Newsletter />
    </>
  );
};

export default Index;
