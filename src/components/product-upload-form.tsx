
"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Upload, PlusCircle, XCircle } from "lucide-react";
import { addProduct } from "@/lib/actions";
import { LabelType } from "@/lib/types";

const labelTypeEnum = z.nativeEnum(LabelType);

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters long." }),
  link: z.string().url({ message: "Please enter a valid URL." }),
  imageUrl: z.string().url({ message: "Please enter a valid image URL." }),
  label: labelTypeEnum,
  bullets: z.array(
    z.object({
      value: z.string().min(1, { message: "Bullet point cannot be empty." }),
    })
  ).max(5, { message: "You can add a maximum of 5 bullet points." }),
});

type ProductFormValues = z.infer<typeof formSchema>;

export default function ProductUploadForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      link: "",
      imageUrl: "",
      label: LabelType.Sticker,
      bullets: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "bullets",
  });

  async function onSubmit(values: ProductFormValues) {
    setIsLoading(true);
    
    const productToSubmit = {
      ...values,
      bullets: values.bullets?.map((bullet) => bullet.value),
    };

    const result = await addProduct(productToSubmit);
    setIsLoading(false);

    if (result.success) {
      toast({
        title: "Product Uploaded!",
        description: "Your new product has been added successfully.",
      });
      form.reset();
    } else {
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: result.error || "An unexpected error occurred.",
      });
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Cool Astronaut Sticker" {...field} />
                  </FormControl>
                  <FormDescription>
                    The public name of your product.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Link</FormLabel>
                  <FormControl>
                    <Input placeholder="https://yourstore.com/product/..." {...field} />
                  </FormControl>
                  <FormDescription>
                    The direct URL to the product page in your store.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://yourstore.com/image.png" {...field} />
                  </FormControl>
                  <FormDescription>
                    The URL for the product's image.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label Type</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a label type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(LabelType).map((label) => (
                        <SelectItem key={label} value={label}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose the category that best fits your product.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-4">
              <FormLabel>Product Bullet Points</FormLabel>
              <FormDescription>
                Add up to 5 key features or bullet points for your product.
              </FormDescription>
              {fields.map((field, index) => (
                <FormField
                  key={field.id}
                  control={form.control}
                  name={`bullets.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <FormControl>
                          <Input {...field} placeholder={`Bullet point #${index + 1}`} />
                        </FormControl>
                        <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                          <XCircle className="h-5 w-5 text-destructive" />
                          <span className="sr-only">Remove Bullet</span>
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => append({ value: "" })}
                disabled={fields.length >= 5}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Bullet Point
              </Button>
               {form.formState.errors.bullets && <p className="text-sm font-medium text-destructive">{form.formState.errors.bullets.message}</p>}
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
              Upload Product
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
