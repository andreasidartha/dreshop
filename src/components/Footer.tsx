import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              DreShop
            </h3>
            <p className="text-muted-foreground">
              Your ultimate destination for premium products and exceptional shopping experience. Discover quality, style, and innovation.
            </p>
            <div className="flex space-x-4">
              <Button variant="outline" size="icon" className="hover:bg-primary hover:text-primary-foreground transition-colors duration-200">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="hover:bg-primary hover:text-primary-foreground transition-colors duration-200">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="hover:bg-primary hover:text-primary-foreground transition-colors duration-200">
                <Instagram className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li><button onClick={() => navigate("/about")} className="text-muted-foreground hover:text-primary transition-colors duration-200">About Us</button></li>
              <li><button onClick={() => navigate("/contact")} className="text-muted-foreground hover:text-primary transition-colors duration-200">Contact</button></li>
              <li><button onClick={() => navigate("/faq")} className="text-muted-foreground hover:text-primary transition-colors duration-200">FAQ</button></li>
              <li><button onClick={() => navigate("/shipping")} className="text-muted-foreground hover:text-primary transition-colors duration-200">Shipping</button></li>
              <li><button onClick={() => navigate("/returns")} className="text-muted-foreground hover:text-primary transition-colors duration-200">Returns</button></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Categories</h4>
            <ul className="space-y-2">
              <li><button onClick={() => navigate("/shop?category=electronics")} className="text-muted-foreground hover:text-primary transition-colors duration-200">Electronics</button></li>
              <li><button onClick={() => navigate("/shop?category=fashion")} className="text-muted-foreground hover:text-primary transition-colors duration-200">Fashion</button></li>
              <li><button onClick={() => navigate("/shop?category=home")} className="text-muted-foreground hover:text-primary transition-colors duration-200">Home & Garden</button></li>
              <li><button onClick={() => navigate("/shop?category=sports")} className="text-muted-foreground hover:text-primary transition-colors duration-200">Sports</button></li>
              <li><button onClick={() => navigate("/shop?category=beauty")} className="text-muted-foreground hover:text-primary transition-colors duration-200">Beauty</button></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">hello@dreshop.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">123 Modern St, City</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h5 className="font-medium">Newsletter</h5>
              <div className="flex space-x-2">
                <Input placeholder="Your email" className="flex-1" />
                <Button size="sm" className="hover:scale-105 transition-transform duration-200">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-muted-foreground">
            © 2024 DreShop. All rights reserved. Built with love and innovation.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
