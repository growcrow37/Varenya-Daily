// src/components/ad-placeholder.tsx
import { cn } from "@/lib/utils";
import { Megaphone } from "lucide-react";

type AdPlaceholderProps = {
  className?: string;
};

export function AdPlaceholder({ className }: AdPlaceholderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 text-gray-500",
        className
      )}
    >
      <div className="flex flex-col items-center space-y-2">
        <Megaphone className="h-8 w-8" />
        <p className="text-sm font-medium">Advertisement</p>
      </div>
    </div>
  );
}