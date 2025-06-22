
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button onClick={logout} variant="outline">Logout</Button>
      </div>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Welcome, {user.displayName || user.email}!</CardTitle>
          <CardDescription>This is your personal dashboard. What would you like to do today?</CardDescription>
        </CardHeader>
        <CardContent>
          <p>You have successfully logged in.</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
            <CardHeader>
                <CardTitle>Submit a Blog Post</CardTitle>
                <CardDescription>Have a story to share? Submit your blog post for our team to review.</CardDescription>
            </CardHeader>
            <CardFooter>
                <Button asChild>
                    <Link href="/submit-blog">Get Started</Link>
                </Button>
            </CardFooter>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Get Topic Suggestions</CardTitle>
                <CardDescription>Need inspiration? Use our AI tool to generate creative blog topic ideas.</CardDescription>
            </CardHeader>
            <CardFooter>
                <Button asChild>
                    <Link href="/topic-suggestion">Generate Ideas</Link>
                </Button>
            </CardFooter>
        </Card>
      </div>
    </div>
  );
}
