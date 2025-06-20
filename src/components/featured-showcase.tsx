import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { FeaturedProduct } from "@/lib/types";

const featuredProducts: FeaturedProduct[] = [
  {
    id: 1,
    name: "Artisanal Coffee Blend",
    description:
      "A rich and aromatic blend of hand-picked coffee beans, roasted to perfection.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "coffee beans",
    link: "#",
  },
  {
    id: 2,
    name: "Handcrafted Leather Wallet",
    description:
      "A stylish and durable wallet made from premium full-grain leather.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "leather wallet",
    link: "#",
  },
  {
    id: 3,
    name: "Organic Green Tea",
    description:
      "A refreshing and healthy green tea, sourced from organic farms.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "tea leaves",
    link: "#",
  },
  {
    id: 4,
    name: "Designer Ceramic Mug",
    description:
      "A beautifully designed ceramic mug, perfect for your morning coffee or tea.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "ceramic mug",
    link: "#",
  },
];

export default function FeaturedShowcase() {
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {featuredProducts.map((product) => (
          <Card key={product.id} className="flex flex-col overflow-hidden">
            <div className="relative aspect-video">
              <Image
                src={product.imageUrl}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                data-ai-hint={product.imageHint}
              />
            </div>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{product.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
                <a href={product.link}>View Product</a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
