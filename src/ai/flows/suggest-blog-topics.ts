'use server';

/**
 * @fileOverview Blog topic suggestion AI agent.
 *
 * - suggestBlogTopics - A function that suggests blog topics.
 * - SuggestBlogTopicsInput - The input type for the suggestBlogTopics function.
 * - SuggestBlogTopicsOutput - The return type for the suggestBlogTopics function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestBlogTopicsInputSchema = z.object({
  storeFocus: z
    .string()
    .describe(
      'The main focus or theme of the store, e.g., "selling handmade artisanal pottery and ceramics"'
    ),
});
export type SuggestBlogTopicsInput = z.infer<
  typeof SuggestBlogTopicsInputSchema
>;

const SuggestBlogTopicsOutputSchema = z.object({
  topics: z.array(z.string()).describe('A list of 5-10 blog topic ideas.'),
});
export type SuggestBlogTopicsOutput = z.infer<
  typeof SuggestBlogTopicsOutputSchema
>;

export async function suggestBlogTopics(
  input: SuggestBlogTopicsInput
): Promise<SuggestBlogTopicsOutput> {
  return suggestBlogTopicsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestBlogTopicsPrompt',
  input: {schema: SuggestBlogTopicsInputSchema},
  output: {schema: SuggestBlogTopicsOutputSchema},
  prompt: `You are an expert content strategist for e-commerce stores.
Generate a list of 5 to 10 engaging blog topic ideas for a store that focuses on: {{{storeFocus}}}.
The topics should be creative, relevant to the store's focus, and appealing to potential customers.
`,
});

const suggestBlogTopicsFlow = ai.defineFlow(
  {
    name: 'suggestBlogTopicsFlow',
    inputSchema: SuggestBlogTopicsInputSchema,
    outputSchema: SuggestBlogTopicsOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
