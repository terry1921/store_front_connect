import TopicSuggestionForm from "@/components/topic-suggestion-form";

export default function TopicSuggestionPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center font-headline">
          Generate Blog Ideas
        </h1>
        <p className="mt-2 text-center text-muted-foreground">
          Stuck on what to write about? Use our AI-powered tool to generate
          creative blog topic ideas based on your store's focus.
        </p>
        <div className="mt-8">
          <TopicSuggestionForm />
        </div>
      </div>
    </div>
  );
}
