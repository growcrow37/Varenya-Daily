// src/components/header.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Rss, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import type { Category } from "@/lib/types";

export function Header() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const { theme, setTheme } = useTheme();
  const navLinks = [
    { name: "Home", href: "/" },
    ...categories.map(category => ({ name: category.name, href: `/category/${category.slug}` }))
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 shadow-sm">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Rss className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-xl text-foreground">Varenya Daily</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium text-muted-foreground">
            {navLinks.slice(0, 5).map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors text-gray-700 hover:text-red-800"
>
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild className="text-foreground">
                <Button variant="ghost" size="icon" className="text-gray-700">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-white">
                <Link href="/" className="mr-6 flex items-center space-x-2 mb-6">
                  <Rss className="h-6 w-6 text-red-800" />
                  <span className="font-bold font-headline text-xl text-gray-900">Varenya Daily</span>
                </Link>
                <nav className="flex flex-col space-y-4">
                  {navLinks.map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="transition-colors text-gray-700 hover:text-red-800 text-lg"
>
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          <nav className="flex items-center">
            {/* Theme Toggle Button */}
 {/* Admin Login Link */}
            <Link href="/admin/login">
              <Button variant="outline" size="sm" className="border-red-800 text-red-800 hover:bg-red-800 hover:text-white">
                Admin Login
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}