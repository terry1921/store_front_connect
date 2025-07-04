
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
  title: z.string().min(3, { message: "El título debe tener al menos 3 caracteres." }),
  link: z.string().url({ message: "Introduzca una URL válida." }),
  imageUrl: z.string().url({ message: "Introduzca una URL de imagen válida." }),
  label: labelTypeEnum,
  bullets: z.array(
    z.object({
      value: z.string().min(1, { message: "La viñeta no puede estar vacía." }),
    })
  ).max(5, { message: "Puedes agregar un máximo de 5 viñetas." }),
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
        title: "¡Producto subido!",
        description: "Su nuevo producto ha sido añadido exitosamente.",
      });
      form.reset();
    } else {
      toast({
        variant: "destructive",
        title: "Fallo de carga",
        description: result.error || "Se produjo un error inesperado.",
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
                  <FormLabel>Título del producto</FormLabel>
                  <FormControl>
                    <Input placeholder="p. ej., Sticker de astronauta genial" {...field} />
                  </FormControl>
                  <FormDescription>
                  El nombre público de su producto.
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
                  <FormLabel>Enlace de la tienda</FormLabel>
                  <FormControl>
                    <Input placeholder="https://yourstore.com/product/..." {...field} />
                  </FormControl>
                  <FormDescription>
                    La URL directa a la página del producto en su tienda.
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
                  <FormLabel>URL de la imagen</FormLabel>
                  <FormControl>
                    <Input placeholder="https://yourstore.com/image.png" {...field} />
                  </FormControl>
                  <FormDescription>
                    La URL de la imagen del producto.
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
                  <FormLabel>Tipo de etiqueta</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un tipo de etiqueta" />
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
                    Elige la categoría que mejor se adapte a tu producto.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-4">
              <FormLabel>Viñetas del producto</FormLabel>
              <FormDescription>
                Agregue hasta 5 características clave o viñetas para su producto.
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
                          <Input {...field} placeholder={`Viñeta #${index + 1}`} />
                        </FormControl>
                        <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                          <XCircle className="h-5 w-5 text-destructive" />
                          <span className="sr-only">Quitar Viñeta</span>
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
                Agregar viñeta
              </Button>
               {form.formState.errors.bullets && <p className="text-sm font-medium text-destructive">{form.formState.errors.bullets.message}</p>}
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
              Subir producto
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
