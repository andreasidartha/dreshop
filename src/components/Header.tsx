import { Search, ShoppingBag, User, Menu, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { ThemeToggle } from "@/components/ThemeProvider";
import MobileMenu from "@/components/MobileMenu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCart();

  const navItems = [
    { label: "Shop", href: "/shop" },
    { label: "New", href: "/shop?filter=new" },
    { label: "Sale", href: "/shop?filter=sale" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const isActiveRoute = (href: string) => {
    if (href === "/shop" && location.pathname === "/shop" && !location.search) {
      return true;
    }
    if (href === "/shop?filter=new" && location.pathname === "/shop" && location.search === "?filter=new") {
      return true;
    }
    if (href === "/shop?filter=sale" && location.pathname === "/shop" && location.search === "?filter=sale") {
      return true;
    }
    return location.pathname === href;
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const menuItemVariants = {
    closed: {
      opacity: 0,
      x: -20
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.header
      className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <motion.button 
              onClick={() => navigate("/")}
              className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              DreShop
            </motion.button>
            
            <nav className="hidden md:flex space-x-6">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  onClick={() => navigate(item.href)}
                  className={`text-foreground hover:text-primary transition-colors duration-200 relative group ${
                    isActiveRoute(item.href) ? 'text-primary font-medium' : ''
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {item.label}
                  <motion.span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-primary ${
                      isActiveRoute(item.href) ? 'w-full' : 'w-0'
                    }`}
                    initial={{ width: isActiveRoute(item.href) ? "100%" : 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <motion.form
              onSubmit={handleSearch}
              className="relative hidden md:block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64 bg-muted/50 border-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              />
            </motion.form>
            
            <ThemeToggle />
            
            {[
              { icon: User, path: "/profile" },
              { icon: Heart, path: "/wishlist" },
            ].map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1, type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative hover:bg-primary/10 transition-colors duration-200"
                  onClick={() => navigate(item.path)}
                >
                  <item.icon className="w-5 h-5" />
                </Button>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative hover:bg-primary/10 transition-colors duration-200"
                onClick={() => navigate("/cart")}
              >
                <ShoppingBag className="w-5 h-5" />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    >
                      <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-5 h-5 flex items-center justify-center">
                        {totalItems}
                      </Badge>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 300 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden hover:bg-primary/10 transition-colors duration-200"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <motion.div
                  animate={{ rotate: isMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        navItems={navItems}
      />
    </motion.header>
  );
};

export default Header;
