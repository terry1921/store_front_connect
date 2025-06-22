"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Mountain, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { user, loading, signInWithGoogle } = useAuth();
  const router = useRouter();
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleSignIn = async () => {
    setIsSigningIn(true);
    try {
      await signInWithGoogle();
      // On success, the useEffect above will redirect
    } catch (error) {
      console.error("Sign in failed", error);
      setIsSigningIn(false); // Re-enable button on failure
      // Optionally, show a toast notification for the error
    }
  };

  // The main page structure is always rendered to prevent hydration errors.
  // The loading state is handled on the button itself.
  return (
    <div className="w-full lg:grid lg:min-h-[calc(100vh-8rem)] lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <Link href="/" className="flex items-center justify-center gap-2 font-bold text-lg mb-4">
              <Mountain className="h-6 w-6 text-primary" />
              <span className="">Terry1921 Store</span>
            </Link>
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Sign in to manage your store
            </p>
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleSignIn}
            disabled={loading || isSigningIn}
          >
            {loading || isSigningIn ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <svg
                className="mr-2 h-4 w-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 381.5 512 244 512 111.8 512 0 398.2 0 256S111.8 0 244 0c69.8 0 130.8 28.5 173.4 74.5l-68.2 67.2C296.5 93.4 272.1 80 244 80 149.6 80 72 158.3 72 256s77.6 176 172 176c60.6 0 111-30.9 140.2-76.4h-140.2v-93.6H488v25.8z"
                ></path>
              </svg>
            )}
            Sign in with Google
          </Button>
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        <Image
          src="https://placehold.co/1024x768.png"
          alt="A modern storefront with artisanal products on display."
          layout="fill"
          objectFit="cover"
          data-ai-hint="artisan storefront"
          className="dark:brightness-[0.5]"
        />
      </div>
    </div>
  );
}
