/**
 * PAGE TEMPLATE
 * 
 * Use this as a reference when creating new pages.
 * 
 * IMPORTANT NOTES:
 * - DO NOT import or render Header/Footer components in individual pages
 * - Header and Footer are already rendered globally in App.tsx
 * - Always include Breadcrumb component for consistent navigation
 * - Use motion components from framer-motion for consistent animations
 * - Follow the established design patterns and spacing
 */

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/PageContainer";

export default function PageTemplate() {
  return (
    <PageContainer
      title="Page Title"
      description="Page description goes here"
      showBreadcrumb
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-lg p-8 shadow-sm"
        >
          <h2 className="text-2xl font-bold mb-6">Section Title</h2>
          <p className="text-muted-foreground mb-6">
            Content goes here...
          </p>
          <Button>Action Button</Button>
        </motion.div>
      </div>
    </PageContainer>
  );
}
