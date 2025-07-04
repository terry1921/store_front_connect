import StoreProfile from '@/components/store-profile';
import FeaturedShowcase from '@/components/featured-showcase';
import BlogList from '@/components/blog-list';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <StoreProfile />
      <Separator className="my-12" />
      <FeaturedShowcase />
      {/* <Separator className="my-12" />
      <BlogList /> */}
    </div>
  );
}
