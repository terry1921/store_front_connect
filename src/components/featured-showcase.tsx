
import Image from "next/image";
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

export default async function FeaturedShowcase() {
  const featuredProducts: Product[] = await getProducts();

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
        Featured Showcase
      </h2>
      <p className="mt-2 text-center text-muted-foreground max-w-2xl mx-auto">
        Discover our handpicked selection of top-quality products. Each item is
        chosen for its craftsmanship and unique character.
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
                    A high-quality, handcrafted item.
                  </p>
                )}
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
                  <a href={product.link}>View Product</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <p className="mt-8 text-center text-muted-foreground">
          No featured products to display at the moment. Check back soon!
        </p>
      )}
    </section>
  );
}
