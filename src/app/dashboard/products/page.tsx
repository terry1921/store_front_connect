
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
      return;
    }
    if (user && user.rol !== 'admin') {
      router.push("/dashboard");
      return;
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
          Subir un nuevo producto
        </h1>
        <p className="mt-2 text-center text-muted-foreground">
          Completa el formulario a continuación para añadir un nuevo producto a tu catálogo. 
          El ID del producto se generará automáticamente.
        </p>
        <div className="mt-8">
          <ProductUploadForm />
        </div>
      </div>
    </div>
  );
}
