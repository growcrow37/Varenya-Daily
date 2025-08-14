// src/components/footer.tsx
import { Rss } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="flex items-center space-x-2">
            <Rss className="h-6 w-6 text-red-800" />
            <span className="font-bold font-headline text-lg text-gray-900">Varenya Daily</span>
          </div>
          <p className="mt-4 text-sm text-gray-600 md:mt-0">
            © {new Date().getFullYear()} Varenya Daily. All Rights Reserved.
          </p>
          <div className="mt-4 flex space-x-4 md:mt-0">
            <Link href="#" className="text-gray-600 hover:text-red-800 transition-colors">
              Twitter
            </Link>
            <Link href="#" className="text-gray-600 hover:text-red-800 transition-colors">
              Facebook
            </Link>
            <Link href="#" className="text-gray-600 hover:text-red-800 transition-colors">
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}