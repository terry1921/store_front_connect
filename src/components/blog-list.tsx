import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { BlogPost } from "@/lib/types";

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Art of Brewing the Perfect Coffee",
    excerpt:
      "Discover the secrets to making a delicious cup of coffee at home, from bean selection to brewing techniques.",
    date: "October 26, 2023",
    author: "Jane Doe",
  },
  {
    id: 2,
    title: "Why Quality Leather Goods Last a Lifetime",
    excerpt:
      "An in-depth look at what makes handcrafted leather goods a worthy investment that only gets better with age.",
    date: "October 15, 2023",
    author: "John Smith",
  },
  {
    id: 3,
    title: "A Guide to the Best Organic Teas",
    excerpt:
      "Explore the world of organic teas and their health benefits. Find your perfect cup for any time of day.",
    date: "September 30, 2023",
    author: "Jane Doe",
  },
];

export default function BlogList() {
  return (
    <section aria-labelledby="blog-list-heading">
      <h2
        id="blog-list-heading"
        className="text-3xl font-bold text-center font-headline"
      >
        From Our Blog
      </h2>
      <p className="mt-2 text-center text-muted-foreground max-w-2xl mx-auto">
        Insights, stories, and tips from our team. Get the latest news and
        updates from behind the scenes.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {blogPosts.map((post) => (
          <Card key={post.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>
                By {post.author} on {post.date}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">{post.excerpt}</p>
            </CardContent>
            <CardFooter>
              <a
                href="#"
                className="font-semibold text-primary hover:underline"
              >
                Read More &rarr;
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
