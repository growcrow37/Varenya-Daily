// src/components/admin/sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Home,
  Menu,
  Newspaper,
  MessageSquare,
  Rss,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "Articles", href: "/admin/articles", icon: Newspaper },
  { name: "Comments", href: "/admin/comments", icon: MessageSquare },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const NavContent = () => (
    <div className="flex h-full flex-col">
       <div className="flex h-16 items-center border-b px-4">
        <Link className="flex items-center gap-2 font-semibold" href="/" legacyBehavior>
          <Rss className="h-6 w-6 text-primary" />
          <span className="font-headline text-lg">Varenya Daily</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-4 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                pathname === item.href && "bg-muted text-primary"
              )}
              legacyBehavior>
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden border-r bg-card md:block w-64">
        <NavContent />
      </div>
      <header className="flex h-14 items-center gap-4 border-b bg-card px-6 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 sm:max-w-xs">
            <NavContent />
          </SheetContent>
        </Sheet>
        <Link className="flex items-center gap-2 font-semibold" href="/" legacyBehavior>
          <Rss className="h-6 w-6 text-primary" />
          <span className="font-headline text-lg">Admin</span>
        </Link>
      </header>
    </>
  );
}