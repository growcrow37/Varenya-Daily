// src/components/header.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Rss } from "lucide-react";
import { useEffect, useState } from "react";
import type { Category } from "@/lib/types";
import { getCategories } from "@/lib/data";

export function Header() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isClient, setIsClient] = useState(false);

  // This effect ensures that browser-specific logic
  // only runs on the client, preventing hydration errors.
  useEffect(() => {
    setIsClient(true);
    getCategories().then(setCategories);
  }, []);

  // We build the navigation links array after fetching categories.
  const navLinks = [
    { name: "Home", href: "/" },
    ...categories.map(category => ({ name: category.name, href: `/category/${category.slug}` }))
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 shadow-sm">
      <div className="container flex h-16 items-center">
        {/* Desktop Navigation */}
        <div className="mr-4 hidden md:flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Rss className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-xl text-foreground">Varenya Daily</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.slice(0, 5).map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors text-muted-foreground hover:text-primary"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {/* Mobile Navigation - Only render on the client */}
          {isClient && (
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <Link href="/" className="mr-6 flex items-center space-x-2 mb-6">
                    <Rss className="h-6 w-6 text-primary" />
                    <span className="font-bold font-headline text-xl">Varenya Daily</span>
                  </Link>
                  <nav className="flex flex-col space-y-4">
                    {navLinks.map(link => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="transition-colors hover:text-primary text-lg"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          )}

          {/* Admin Login Button */}
          <div className="flex items-center">
            <Button asChild variant="outline" size="sm">
              <Link href="/admin/login">Admin Login</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
