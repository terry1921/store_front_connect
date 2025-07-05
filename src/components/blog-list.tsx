
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getArticles } from "@/lib/actions";
import { ArticleStatus, type Article } from "@/lib/types";

const formatDate = (date: { seconds: number; nanoseconds: number }) => {
  if (!date?.seconds) return 'N/A';
  return new Date(date.seconds * 1000).toLocaleDateString();
}

export default async function BlogList() {
  const articles = await getArticles(ArticleStatus.Accepted);

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
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {articles.map((article) => (
            <Card key={article.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{article.title}</CardTitle>
                <CardDescription>
                  By {article.author} on {formatDate(article.date)}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{article.shortDescription}</p>
              </CardContent>
              <CardFooter>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary hover:underline"
                >
                  Read More &rarr;
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold">No Blog Posts Yet</h3>
          <p className="mt-2 text-muted-foreground">
            There are no articles to display at the moment. Please check back soon!
          </p>
        </div>
      )}
    </section>
  );
}
