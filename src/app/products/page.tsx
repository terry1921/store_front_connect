
import { getProducts } from "@/lib/actions";
import type { Product } from "@/lib/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

export default async function AllProductsPage() {
  const allProducts: Product[] = await getProducts();

  const getAiHint = (title: string) => {
    return title.split(' ').slice(0, 2).join(' ');
  };

  const validProducts = allProducts.filter(p => p.id && p.title && p.imageUrl && p.link);

  return (
    <div className="container mx-auto px-4 py-8">
      <section aria-labelledby="all-products-heading">
        <div className="text-center mb-8">
            <h1
            id="all-products-heading"
            className="text-4xl font-bold font-headline"
            >
            All Products
            </h1>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            Browse our complete collection of high-quality, handcrafted items.
            </p>
        </div>

        {validProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    <Badge variant="secondary" className="w-fit">
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
                      A high-quality, handcrafted item.
                    </p>
                  )}
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
                    <a href={product.link} target="_blank" rel="noopener noreferrer">View Product</a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold">No Products Yet</h2>
            <p className="mt-2 text-muted-foreground">
              There are no products to display at the moment. Please check back soon!
            </p>
             <Button asChild className="mt-6">
                <Link href="/">Back to Home</Link>
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
