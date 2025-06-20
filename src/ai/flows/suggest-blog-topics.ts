// src/ai/flows/suggest-blog-topics.ts
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
    .describe('The main focus or theme of the store, e.g., 