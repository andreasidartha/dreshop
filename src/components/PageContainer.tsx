import { motion } from "framer-motion";
import { Breadcrumb } from "@/components/Breadcrumb";

interface PageContainerProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  showBreadcrumb?: boolean;
  className?: string;
}

export function PageContainer({
  children,
  title,
  description,
  showBreadcrumb = false,
  className = "",
}: PageContainerProps) {
  return (
    <div className={`min-h-screen bg-background ${className}`}>
      {showBreadcrumb && <Breadcrumb />}
      
      <div className="container mx-auto px-4 py-8">
        {(title || description) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            {title && (
              <h1 className="text-4xl font-bold mb-4 text-foreground">
                {title}
              </h1>
            )}
            {description && (
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </motion.div>
        )}
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
} 