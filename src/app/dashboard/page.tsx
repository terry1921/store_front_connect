
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
          <CardTitle>Bienvenido, {user.displayName || user.email}!</CardTitle>
          <CardDescription>Este es tu panel personal. ¿Qué te gustaría hacer hoy?</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Has iniciado sesión exitosamente.</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
            <CardHeader>
                <CardTitle>Enviar una publicación de blog</CardTitle>
                <CardDescription>¿Tienes una historia que compartir? Envía tu entrada de blog para que nuestro equipo la revise.</CardDescription>
            </CardHeader>
            <CardFooter>
                <Button asChild>
                    <Link href="/submit-blog">Empezar</Link>
                </Button>
            </CardFooter>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Obtenga sugerencias de temas</CardTitle>
                <CardDescription>¿Necesitas inspiración? Usa nuestra herramienta de IA para generar ideas creativas para tu blog.</CardDescription>
            </CardHeader>
            <CardFooter>
                <Button asChild>
                    <Link href="/topic-suggestion">Generar Ideas</Link>
                </Button>
            </CardFooter>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>Subir un producto</CardTitle>
                <CardDescription>Añade nuevos productos al listado de tu tienda.</CardDescription>
            </CardHeader>
            <CardFooter>
                <Button asChild>
                    <Link href="/dashboard/products">Subir Producto</Link>
                </Button>
            </CardFooter>
        </Card>
      </div>
    </div>
  );
}
