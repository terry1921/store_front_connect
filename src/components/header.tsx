
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Menu,
  Mountain,
  Twitter,
  Facebook,
  Instagram,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { UserNav } from "./user-nav";

export function AppHeader() {
  const { user } = useAuth();

  return (
    <header className="bg-card shadow-sm sticky top-0 z-40">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Mountain className="h-6 w-6 text-primary" />
          <span className="sm:inline">Terry1921 Store</span>
        </Link>
        
        <div className="flex items-center gap-4">
           { user ? <UserNav /> : (
             <div className="hidden sm:flex items-center gap-2">
               <Button variant="ghost" size="icon" asChild>
                  <a href="https://x.com/terry1921" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                      <Twitter className="h-4 w-4" />
                  </a>
               </Button>
               <Button variant="ghost" size="icon" asChild>
                  <a href="https://www.facebook.com/terryrockstar" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                      <Facebook className="h-4 w-4" />
                  </a>
               </Button>
               <Button variant="ghost" size="icon" asChild>
                  <a href="https://www.instagram.com/elterry1921" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                      <Instagram className="h-4 w-4" />
                  </a>
               </Button>
             </div>
           )}
        </div>
      </div>
    </header>
  );
}
