"use client";
import { supabase } from "@/server/supabaseClient";
import { useState, useEffect } from "react";
import { ProductCard } from "@/app/components/product-card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { insertProductSchema } from "@/shared/schema";
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}
interface ProductFormData {
  id?: number;
  name: string;
  description: string;
  price: number | undefined;
  image_url: string;
}
export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");
    if (error) console.error("Error fetching products:", error);
    else setProducts(data || []);
  };

  const form = useForm({
    resolver: zodResolver(insertProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: undefined,
      image_url: "",
    },
  });

  const saveProduct = async (data: ProductFormData) => {
    const formattedData = { ...data, price: Number(data.price) };
    if (data.id) {
      await supabase.from("products").update(formattedData).eq("id", data.id);
    } else {
      await supabase.from("products").insert([formattedData]);
    }
    fetchProducts();
    setDialogOpen(false);
    form.reset();
  };

  const deleteProduct = async (id: number) => {
    await supabase.from("products").delete().eq("id", id);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Product Management</h1>
        <Dialog
          open={dialogOpen}
          onOpenChange={(isOpen) => {
            setDialogOpen(isOpen);
            if (isOpen) {
              form.reset({
                name: "",
                description: "",
                price: undefined,
                image_url: "",
              });
            }
          }}
        >
          <DialogTrigger asChild>
            <Button className="bg-accent hover:bg-accent/90">
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>
                {form.watch("name") ? "Edit Product" : "Add New Product"}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(saveProduct)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="focus-visible:ring-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="focus-visible:ring-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field: { onChange, value, ...field } }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          value={value == null ? "" : value}
                          onChange={(e) => {
                            const val = e.target.value;
                            onChange(val === "" ? null : Number(val));
                          }}
                          {...field}
                          className="focus-visible:ring-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="focus-visible:ring-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  {form.watch("name") ? "Update Product" : "Create Product"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isAdmin
            onEdit={(product) => {
              form.reset(product);
              setDialogOpen(true);
            }}
            onDelete={() => deleteProduct(product.id)}
          />
        ))}
      </div>
    </div>
  );
}
