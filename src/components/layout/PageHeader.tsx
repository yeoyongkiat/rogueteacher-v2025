import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ANIMATION_CONFIG } from "@/lib/constants";
import { ArrowLeft } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: string;
  backText?: string;
  onBack?: () => void;
}

export function PageHeader({
  title,
  description,
  badge,
  backText,
  onBack
}: PageHeaderProps) {
  return (
    <motion.div
      {...ANIMATION_CONFIG.fadeIn}
      className="relative mb-16"
    >
      <div className="mt-12 space-y-4">
        {onBack && (
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 
              rounded-lg hover:bg-black/90 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            {backText || 'Back'}
          </button>
        )}

        <div className="space-y-4">
          {badge && (
            <Badge variant="default">
              {badge}
            </Badge>
          )}

          <h1 className="text-4xl md:text-6xl font-semibold">
            {title}
          </h1>
          
          {description && (
            <p className="text-sm md:text-base opacity-90 max-w-2xl">
              {description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
} 