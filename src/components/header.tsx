"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Rss, Sun, Moon } from "lucide-react";
import { getCategories } from "@/lib/data"; // Assuming this is where your data fetching is
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
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" legacyBehavior passHref>
 <div className="mr-6 flex items-center space-x-2">
            <Rss className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-xl">Varenya Daily</span>
 </div>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.slice(0, 5).map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-primary"
                legacyBehavior>
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <Link href="/" legacyBehavior passHref>
 <div className="mr-6 flex items-center space-x-2 mb-6">
                  <Rss className="h-6 w-6 text-primary" />
                  <span className="font-bold font-headline text-xl">Varenya Daily</span>
 </div>
                </Link>
                <nav className="flex flex-col space-y-4">
                  {navLinks.map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="transition-colors hover:text-primary text-lg"
                      legacyBehavior>
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          <nav className="flex items-center">
            {/* Theme Toggle Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
            {/* Admin Login Link */}
            <Link href="/admin/login" passHref legacyBehavior>
              <Button variant="outline" size="sm">Admin Login</Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
