import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "./ui/button";

export default function StoreProfile() {
  return (
    <section aria-labelledby="store-profile-heading">
      <Card className="overflow-hidden">
        <div className="relative h-48 w-full bg-muted">
          <Image
            src="https://placehold.co/1200x400.png"
            alt="Store banner"
            fill
            className="object-cover rounded-t-lg"
            data-ai-hint="store banner"
          />
        </div>
        <CardContent className="p-6 relative">
          <div className="absolute -top-16 left-6">
            <div className="relative h-32 w-32 rounded-full border-4 border-card bg-card">
              <Image
                src="https://placehold.co/200x200.png"
                alt="Store profile"
                fill
                className="object-cover rounded-full"
                data-ai-hint="store logo"
              />
            </div>
          </div>
          <div className="pt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h1 id="store-profile-heading" className="text-3xl font-bold font-headline">
                Terry1921 Store Front
              </h1>
              <p className="text-muted-foreground mt-2">
                Your one-stop shop for unique and high-quality goods. We are
                passionate about bringing you the best products with exceptional
                service. Explore our collection and find your new favorite
                item today!
              </p>
            </div>
            <div className="space-y-3 text-sm">
              <h2 className="font-semibold text-base">Contact Us</h2>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>123 Market St, San Francisco, CA 94103</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>(123) 456-7890</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>hello@terry1921.com</span>
              </div>
              <Button className="w-full mt-2" variant="outline" asChild>
                <a href="#">Visit Our Website</a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
