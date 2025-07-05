
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { getArticles } from "@/lib/actions";
import type { Article } from "@/lib/types";
import ArticlesTable from "@/components/articles-table";

export default function ArticlesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [isPageLoading, setIsPageLoading] = useState(true);

  const fetchArticles = async () => {
    setIsPageLoading(true);
    const data = await getArticles();
    setArticles(data);
    setIsPageLoading(false);
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
      return;
    }
    if (!loading && user && user.rol !== 'admin') {
      router.push("/dashboard");
      return;
    }
    if (!loading && user && user.rol === 'admin') {
      fetchArticles();
    }
  }, [user, loading, router]);
  
  if (loading || isPageLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Articles</h1>
        <p className="text-muted-foreground">{articles.length} articles found</p>
      </div>
      <ArticlesTable initialArticles={articles} onUpdate={fetchArticles} />
    </div>
  );
}
