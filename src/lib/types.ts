export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
}

export interface FeaturedProduct {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  link: string;
  imageHint: string;
}
