
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import ProductUploadForm from "@/components/product-upload-form";

export default function UploadProductPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center font-headline">
          Upload a New Product
        </h1>
        <p className="mt-2 text-center text-muted-foreground">
          Fill out the form below to add a new product to your catalog.
          The product ID will be generated automatically.
        </p>
        <div className="mt-8">
          <ProductUploadForm />
        </div>
      </div>
    </div>
  );
}
