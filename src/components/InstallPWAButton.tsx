import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";
import { usePWA } from "@/hooks/usePWA";

const InstallPWAButton = () => {
  const { canInstall, installPWA } = usePWA();

  if (!canInstall) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-4 right-4 z-50"
        initial={{ opacity: 0, y: 100, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 100, scale: 0.8 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        <div className="bg-card border rounded-2xl shadow-2xl p-4 max-w-sm">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center">
                <Download className="w-5 h-5 text-white" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-foreground">
                Install DreShop
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Get the best shopping experience with our app
              </p>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              className="flex-shrink-0 p-1 h-auto"
              onClick={() => {
                // Hide the button
                const event = new CustomEvent('hideInstallPWA');
                window.dispatchEvent(event);
              }}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex gap-2 mt-3">
            <Button
              onClick={installPWA}
              size="sm"
              className="flex-1 bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary"
            >
              Install App
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const event = new CustomEvent('hideInstallPWA');
                window.dispatchEvent(event);
              }}
            >
              Later
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InstallPWAButton; 