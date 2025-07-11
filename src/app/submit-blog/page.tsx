
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import BlogSubmissionForm from "@/components/blog-submission-form";
import { Loader2 } from "lucide-react";

export default function SubmitBlogPage() {
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
          Comparte tu historia
        </h1>
        <p className="mt-2 text-center text-muted-foreground">
          ¿Tienes una idea para una entrada de blog? 
          Completa el formulario a continuación para enviar tu borrador a nuestro equipo 
          para su revisión.
        </p>
        <div className="mt-8">
          <BlogSubmissionForm />
        </div>
      </div>
    </div>
  );
}
