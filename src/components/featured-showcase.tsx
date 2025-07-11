
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/types";
import { getProducts } from "@/lib/actions";
import { Badge } from "@/components/ui/badge";

export default async function FeaturedShowcase() {
  const products = await getProducts(5);

  const hasMoreProducts = products.length > 4;
  const featuredProducts = hasMoreProducts ? products.slice(0, 4) : products;

  const getAiHint = (title: string) => {
    return title.split(' ').slice(0, 2).join(' ');
  };

  const validProducts = featuredProducts.filter(p => p.id && p.title && p.imageUrl && p.link);

  return (
    <section aria-labelledby="featured-showcase-heading">
      <h2
        id="featured-showcase-heading"
        className="text-3xl font-bold text-center font-headline"
      >
        Presentación De Productos
      </h2>
      <p className="mt-2 text-center text-muted-foreground max-w-2xl mx-auto">
        Descubra nuestra cuidada selección de productos de primera calidad. 
        Cada artículo se elige por su artesanía y su carácter único.
      </p>
      {validProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {validProducts.map((product) => (
            <Card key={product.id} className="flex flex-col overflow-hidden">
              <div className="relative aspect-video">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill={true}
                  className="object-contain p-2"
                  data-ai-hint={getAiHint(product.title)}
                />
              </div>
              <CardHeader>
                <CardTitle>{product.title}</CardTitle>
                {product.label && (
                  <Badge variant="default" className="w-fit">
                    {product.label}
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="flex-grow">
                {product.bullets && product.bullets.length > 0 ? (
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {product.bullets.map((bullet, index) => (
                      <li key={index}>{bullet}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Un artículo de alta calidad hecho a mano.
                  </p>
                )}
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-accent text-accent-foreground">
                  <a href={product.link}>Ver producto</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <p className="mt-8 text-center text-muted-foreground">
          No hay productos destacados para mostrar en este momento. ¡Vuelve pronto!
        </p>
      )}
       {hasMoreProducts && (
        <div className="mt-8 text-center">
          <Button asChild>
            <Link href="/products">Ver más productos</Link>
          </Button>
        </div>
      )}
    </section>
  );
}
