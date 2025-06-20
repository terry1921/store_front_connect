'use server';

import { suggestBlogTopics } from '@/ai/flows/suggest-blog-topics';

export async function getBlogTopicSuggestions(storeFocus: string): Promise<{topics?: string[]; error?: string}> {
  try {
    // The AI flow returns an object with a 'topics' property which is an array of strings.
    const result = await suggestBlogTopics({ storeFocus });
    if (result && result.topics) {
      return { topics: result.topics };
    }
    return { error: 'The AI returned an unexpected response format.'}
  } catch (e) {
    console.error(e);
    // Provide a user-friendly error message.
    return { error: 'Failed to generate topic suggestions due to an internal error. Please try again later.' };
  }
}
