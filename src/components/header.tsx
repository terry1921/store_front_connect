
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  Mountain,
  Twitter,
  Facebook,
  Instagram,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { UserNav } from "./user-nav";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/submit-blog", label: "Submit Blog" },
  { href: "/topic-suggestion", label: "Topic Suggestions" },
];

export function AppHeader() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <header className="bg-card shadow-sm sticky top-0 z-40">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Mountain className="h-6 w-6 text-primary" />
          <span className="hidden sm:inline">Terry1921 Store</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
           { user ? <UserNav /> : (
             <div className="hidden sm:flex items-center gap-2">
               <Button variant="ghost" size="icon" asChild>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                      <Twitter className="h-4 w-4" />
                  </a>
               </Button>
               <Button variant="ghost" size="icon" asChild>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                      <Facebook className="h-4 w-4" />
                  </a>
               </Button>
               <Button variant="ghost" size="icon" asChild>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                      <Instagram className="h-4 w-4" />
                  </a>
               </Button>
             </div>
           )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid gap-6 p-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-lg">
                  <Mountain className="h-6 w-6 text-primary" />
                  <span>Terry1921 Store</span>
                </Link>
                <nav className="grid gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "text-base font-medium transition-colors hover:text-primary",
                        pathname === link.href
                          ? "text-primary"
                          : "text-muted-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                   {user && (
                    <Link
                      href="/dashboard"
                      className={cn(
                        "text-base font-medium transition-colors hover:text-primary",
                        pathname === "/dashboard"
                          ? "text-primary"
                          : "text-muted-foreground"
                      )}
                    >
                      Dashboard
                    </Link>
                  )}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
