import Link from "next/link";
import { Button } from "./ui/button";

export function AppFooter() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto py-6 px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground text-center sm:text-left">
          © {new Date().getFullYear()} Terry1921 Store Front Connect. All rights
          reserved.
        </p>
        <Button asChild variant="outline">
          <Link href="/login">Admin Login</Link>
        </Button>
      </div>
    </footer>
  );
}
