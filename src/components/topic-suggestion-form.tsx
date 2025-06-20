"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBlogTopicSuggestions } from "@/lib/actions";
import { Loader2, Wand2, Lightbulb } from "lucide-react";
import { Separator } from "./ui/separator";

const formSchema = z.object({
  storeFocus: z
    .string()
    .min(10, { message: "Please describe your store's focus in at least 10 characters." }),
});

export default function TopicSuggestionForm() {
  const { toast } = useToast();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storeFocus: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setSuggestions([]);
    const result = await getBlogTopicSuggestions(values.storeFocus);
    setIsLoading(false);

    if (result.error) {
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: result.error,
      });
    } else if (result.topics) {
      setSuggestions(result.topics);
       toast({
        title: "Success!",
        description: "We've generated some fresh ideas for you.",
      });
    }
  }

  return (
    <>
      <Card>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="storeFocus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What is your store's focus?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., selling handmade artisanal pottery and ceramics"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Describe your store's main products or theme. The more
                      detail, the better the suggestions!
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Generate Ideas
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {(isLoading || suggestions.length > 0) && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lightbulb className="mr-2 h-5 w-5 text-primary" />
              Suggested Topics
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-2">
                         <div className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                         <div className="h-4 bg-muted rounded w-3/4 animate-pulse" style={{ animationDelay: `${i * 100}ms` }}/>
                    </div>
                ))}
              </div>
            )}
            {suggestions.length > 0 && (
              <ul className="space-y-3">
                {suggestions.map((topic, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary font-bold mr-3">&bull;</span>
                    <p className="text-sm text-foreground">{topic}</p>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
}
