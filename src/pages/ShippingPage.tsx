import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Truck,
  Clock,
  Globe,
  Package,
  AlertCircle,
  ArrowRight,
  MapPin,
  Shield,
  CheckCircle
} from "lucide-react";
import { PageContainer } from "@/components/PageContainer";

const ShippingPage = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const shippingMethods = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Standard Shipping",
      description: "5-7 business days",
      price: "Free on orders over $50",
      features: [
        "Trackable shipping",
        "Signature not required",
        "Insurance included"
      ]
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Express Shipping",
      description: "2-3 business days",
      price: "$9.99",
      features: [
        "Priority handling",
        "Real-time tracking",
        "Signature required"
      ]
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "International Shipping",
      description: "7-14 business days",
      price: "Varies by location",
      features: [
        "Worldwide delivery",
        "Customs clearance",
        "Tracking included"
      ]
    }
  ];

  const shippingInfo = [
    {
      icon: <Package className="w-6 h-6" />,
      title: "Order Processing",
      description: "Orders are typically processed within 1-2 business days."
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Delivery Areas",
      description: "We ship to all 50 US states and most international destinations."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Package Protection",
      description: "All packages are insured against damage and loss during transit."
    }
  ];

  const shippingRestrictions = [
    "Some items may have shipping restrictions based on size or weight",
    "International shipping may be limited for certain products",
    "Remote areas may have longer delivery times",
    "Some countries may have import restrictions"
  ];

  return (
    <PageContainer
      title="Shipping Information"
      description="Fast and reliable shipping options for your orders"
      showBreadcrumb
    >
      <div className="max-w-4xl mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-lg p-8 shadow-sm"
        >
          <h2 className="text-2xl font-bold mb-6">Shipping Options</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <Truck className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Standard Shipping</h3>
                <p className="text-muted-foreground">
                  • 3-5 business days<br />
                  • Free on orders over $50<br />
                  • Tracking number provided
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Package className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Express Shipping</h3>
                <p className="text-muted-foreground">
                  • 1-2 business days<br />
                  • Available for all orders<br />
                  • Priority handling
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Clock className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Processing Time</h3>
                <p className="text-muted-foreground">
                  • Orders are processed within 24 hours<br />
                  • Weekends and holidays may affect delivery times<br />
                  • International orders may take longer
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-primary/5 rounded-lg p-8"
        >
          <h2 className="text-2xl font-bold mb-6">International Shipping</h2>
          <div className="flex items-start space-x-4">
            <MapPin className="w-6 h-6 text-primary mt-1" />
            <div>
              <p className="text-muted-foreground mb-6">
                We ship to most countries worldwide. International shipping rates and delivery times vary by location. You can check shipping rates during checkout.
              </p>
              <Button asChild>
                <a href="/contact">Contact Us</a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </PageContainer>
  );
};

export default ShippingPage;
