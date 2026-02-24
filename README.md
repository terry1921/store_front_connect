# Terry1921 Store Front Connect

Terry1921 Store Front Connect is a comprehensive platform designed to empower store owners with a centralized digital storefront. It facilitates seamless store profile management, product showcasing, and content creation through AI-assisted blog topic generation.

## Purpose

The primary purpose of this software is to provide a unified interface for:
- **Store Profile Management:** Establishing a strong online presence with customizable store details.
- **Product Showcasing:** Highlighting featured products and services to attract customers.
- **Content Strategy:** Leveraging AI to generate relevant blog topics, enhancing engagement and SEO.
- **Link Aggregation:** Centralizing external links to social media and other platforms.

## Architecture

This project is built using a modern, scalable tech stack:

### Frontend
- **Framework:** [Next.js 15](https://nextjs.org/) (App Router) for server-side rendering and static site generation.
- **Language:** TypeScript for type safety and developer experience.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) for utility-first styling.
- **UI Components:** [Radix UI](https://www.radix-ui.com/) (accessible, unstyled primitives) integrated via shadcn/ui patterns.
- **Icons:** [Lucide React](https://lucide.dev/).
- **Charts:** [Recharts](https://recharts.org/) for data visualization.

### Backend & Services
- **Backend-as-a-Service:** [Firebase](https://firebase.google.com/) for authentication, database, and hosting.
- **AI Integration:** [Genkit](https://firebase.google.com/docs/genkit) with Google AI (Gemini models) for generating blog topic suggestions.

### State & Validation
- **Form Handling:** [React Hook Form](https://react-hook-form.com/).
- **Schema Validation:** [Zod](https://zod.dev/).

## Features

- **Store Profile:** customizable header banner, profile image, contact details, and address.
- **Featured Showcase:** dedicated section to display key products or services with rich media.
- **Link Aggregator:** a central hub for all external store links (socials, website, etc.).
- **Blog Management:**
    - **Submission:** intuitive form for creating new blog posts.
    - **Display:** reverse chronological feed of blog articles.
- **AI Topic Suggestion:** an intelligent tool that suggests blog topics based on trending keywords and store focus using Genkit flows.

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up environment variables:
    Create a `.env.local` file in the root directory and add necessary keys (Firebase config, Google AI API key, etc.).

### Development

To start the Next.js development server:

```bash
npm run dev
```

To start the Genkit development server (for AI flows):

```bash
npm run genkit:dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app`: App Router pages and layouts.
    - `src/app/topic-suggestion`: AI Topic Suggestion feature.
    - `src/app/dashboard`: Admin dashboard for managing content.
- `src/components`: Reusable UI components.
- `src/ai`: Genkit AI flow definitions.
    - `src/ai/flows/suggest-blog-topics.ts`: Logic for generating topic suggestions.
- `src/lib`: Utility functions and Firebase configuration.

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Genkit Documentation](https://firebase.google.com/docs/genkit)
