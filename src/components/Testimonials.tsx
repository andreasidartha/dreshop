
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Verified Customer",
    content: "DreShop has exceeded all my expectations! The quality of products is outstanding and the shipping was lightning-fast. The customer service team went above and beyond to help me find the perfect items.",
    rating: 5,
    avatar: "photo-1494790108755-2616b612b1e0",
    emoji: "✨"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Tech Enthusiast",
    content: "The tech products at DreShop are cutting-edge and reasonably priced. I've been a loyal customer for over a year now and they never disappoint with their quality and service.",
    rating: 5,
    avatar: "photo-1472099645785-5658abf4ff4e",
    emoji: "💻"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Fashion Blogger",
    content: "DreShop has become my go-to for all things fashion. Their curated selection is always on-trend and high quality. I love how they stay ahead of the latest trends!",
    rating: 5,
    avatar: "photo-1438761681033-6461ffad8d80",
    emoji: "👗"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Don't just take our word for it. Here's what our satisfied customers have to say about their experience with DreShop.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-300 border border-border/50 hover:border-primary/30 bg-gradient-to-br from-card to-card/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-2xl">{testimonial.emoji}</span>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 italic text-base leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center">
                    <img
                      src={`https://images.unsplash.com/${testimonial.avatar}?auto=format&fit=crop&w=100&q=80`}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
