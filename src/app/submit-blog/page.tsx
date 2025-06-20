import BlogSubmissionForm from "@/components/blog-submission-form";

export default function SubmitBlogPage() {
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
