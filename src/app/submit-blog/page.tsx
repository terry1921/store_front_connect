
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
          Share Your Story
        </h1>
        <p className="mt-2 text-center text-muted-foreground">
          Have an idea for a blog post? Fill out the form below to submit your
          draft to our team for review.
        </p>
        <div className="mt-8">
          <BlogSubmissionForm />
        </div>
      </div>
    </div>
  );
}
