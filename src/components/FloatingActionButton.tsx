import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, MessageCircle, ArrowUp } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const actions = [
    {
      icon: ShoppingCart,
      label: "Cart",
      action: () => navigate("/cart"),
      color: "bg-primary hover:bg-primary/90"
    },
    {
      icon: Heart,
      label: "Wishlist",
      action: () => navigate("/wishlist"),
      color: "bg-red-500 hover:bg-red-600"
    },
    {
      icon: MessageCircle,
      label: "Support",
      action: () => navigate("/contact"),
      color: "bg-green-500 hover:bg-green-600"
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-16 right-0 space-y-3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            {actions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  onClick={action.action}
                  className={`${action.color} text-white rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl transition-all duration-300`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <action.icon className="w-5 h-5" />
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-primary to-purple-600 text-white rounded-full w-14 h-14 p-0 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? <ArrowUp className="w-6 h-6" /> : <ShoppingCart className="w-6 h-6" />}
          </motion.div>
        </Button>
      </motion.div>
    </div>
  );
};

export default FloatingActionButton; 