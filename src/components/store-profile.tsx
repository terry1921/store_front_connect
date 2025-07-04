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
            src="/assets/images/banner_store.png"
            priority={false}
            loading="lazy"
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
                src="/assets/images/profile_store.png"
                priority={false}
                loading="lazy"
                alt="Terry1921 Store profile image"
                fill
                className="object-cover rounded-full"
              />
            </div>
          </div>
          <div className="pt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h1 id="store-profile-heading" className="text-3xl font-bold font-headline">
                Terry1921 Store Front
              </h1>
              <p className="text-muted-foreground mt-2">
                En nuestra tienda encontrarás playeras, imanes y stickers únicos, 
                diseñados con pasión y un toque divertido. 
                ¡Exprésate con arte que se pega, se viste y se disfruta!
              </p>
            </div>
            <div className="space-y-3 text-sm">
              <h2 className="font-semibold text-base">Contáctanos</h2>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>Sin dirección fisica</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>(565) 912-7473</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>terryrockstar22@gmail.com</span>
              </div>
              <Button className="w-full mt-2" variant="outline" asChild>
                <a target="_blank" href="https://www.stickermule.com/mx/terry1921">Visita nuestra tienda</a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
