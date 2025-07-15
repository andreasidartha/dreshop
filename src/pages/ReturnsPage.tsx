import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Package,
  Clock,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Truck,
  RefreshCw
} from "lucide-react";
import { PageContainer } from "@/components/PageContainer";

const ReturnsPage = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const returnSteps = [
    {
      icon: <Package className="w-8 h-8" />,
      title: "Prepare Your Return",
      description: "Ensure your item is in its original condition with all tags and packaging intact."
    },
    {
      icon: <RefreshCw className="w-8 h-8" />,
      title: "Initiate Return",
      description: "Log into your account, go to 'Order History', and select the item you wish to return."
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Ship Your Return",
      description: "Use the provided shipping label and drop off your package at any authorized carrier location."
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Receive Refund",
      description: "Once we receive and process your return, your refund will be issued within 5-7 business days."
    }
  ];

  const returnPolicy = [
    {
      title: "30-Day Return Window",
      description: "You have 30 days from the delivery date to initiate a return for most items."
    },
    {
      title: "Original Condition",
      description: "Items must be unused and in their original packaging with all tags attached."
    },
    {
      title: "Free Return Shipping",
      description: "We provide free return shipping labels for all eligible returns."
    },
    {
      title: "Refund Processing",
      description: "Refunds are processed within 5-7 business days after we receive your return."
    }
  ];

  const nonReturnableItems = [
    "Items marked as 'Final Sale'",
    "Personalized or custom-made products",
    "Items without original packaging",
    "Used or damaged items",
    "Items purchased from third-party sellers"
  ];

  return (
    <PageContainer
      title="Returns & Refunds"
      description="Our hassle-free return policy ensures your complete satisfaction"
      showBreadcrumb
    >
      <div className="max-w-4xl mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-lg p-8 shadow-sm"
        >
          <h2 className="text-2xl font-bold mb-6">Return Policy</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <Clock className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-2">30-Day Return Window</h3>
                <p className="text-muted-foreground">
                  You have 30 days from the delivery date to initiate a return. Items must be unused and in their original packaging.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Package className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Return Process</h3>
                <p className="text-muted-foreground">
                  1. Log into your account and go to Order History<br />
                  2. Select the order and click "Return Item"<br />
                  3. Print the return label and attach it to your package<br />
                  4. Drop off at your nearest shipping location
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <AlertCircle className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Important Notes</h3>
                <p className="text-muted-foreground">
                  • Items must be in original condition with all tags attached<br />
                  • Original packaging must be included<br />
                  • Shipping costs for returns are the customer's responsibility<br />
                  • Refunds are processed within 5-7 business days after receiving the return
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
          <h2 className="text-2xl font-bold mb-6">Need Help?</h2>
          <p className="text-muted-foreground mb-6">
            If you have any questions about returns or need assistance with your return, our customer service team is here to help.
          </p>
          <Button asChild>
            <a href="/contact">Contact Support</a>
          </Button>
        </motion.div>
      </div>
    </PageContainer>
  );
};

export default ReturnsPage;
