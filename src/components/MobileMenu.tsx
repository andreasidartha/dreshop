import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: { label: string; href: string }[];
}

const MobileMenu = ({ isOpen, onClose, navItems }: MobileMenuProps) => {
  const navigate = useNavigate();
  const { totalItems } = useCart();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Menu */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-[80%] max-w-sm bg-background border-l border-border shadow-lg z-50 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <motion.button
                  onClick={() => handleNavigation("/")}
                  className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ModernShop
                </motion.button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="hover:bg-muted"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <nav className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    onClick={() => handleNavigation(item.href)}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-colors duration-200",
                      "flex items-center justify-between"
                    )}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                    {item.href === "/cart" && totalItems > 0 && (
                      <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                        {totalItems}
                      </span>
                    )}
                  </motion.button>
                ))}
              </nav>

              <div className="mt-8 pt-8 border-t border-border">
                <h3 className="text-sm font-medium text-muted-foreground mb-4">
                  Quick Links
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "About", href: "/about" },
                    { label: "Contact", href: "/contact" },
                    { label: "FAQ", href: "/faq" },
                    { label: "Shipping", href: "/shipping" },
                    { label: "Returns", href: "/returns" },
                    { label: "Shop", href: "/shop" },
                  ].map((item, index) => (
                    <motion.button
                      key={item.label}
                      onClick={() => handleNavigation(item.href)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu; 