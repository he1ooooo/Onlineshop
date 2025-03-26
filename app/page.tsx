"use client";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/shared/schema";
import { ProductCard } from "@/app/components/product-card";
import { Skeleton } from "@/app/components/ui/skeleton";
import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/app/lib/cart-store";
import Link from "next/link";
import Image from "next/image";
import ToastComponent, { showToast } from "@/app/components/toast";
export default function Products() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["products"], // Use a simple key
    queryFn: async () => {
      const response = await fetch(
        "https://kqqkcergzwlfbfmyrijr.supabase.co/rest/v1/products",
        {
          headers: {
            apikey: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxcWtjZXJnendsZmJmbXlyaWpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1MzQ3MzYsImV4cCI6MjA1NTExMDczNn0.4yEJaQJlmA5mNfuId6jVRjlCI8bhyrdTJLo4vd0Fpfo`,
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxcWtjZXJnendsZmJmbXlyaWpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1MzQ3MzYsImV4cCI6MjA1NTExMDczNn0.4yEJaQJlmA5mNfuId6jVRjlCI8bhyrdTJLo4vd0Fpfo`, // Include your access token if needed
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  const addItem = useCartStore((state) => state.addItem);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-[300px] w-full" />
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        ))}
      </div>
    );
  }

  if (!products?.length) return null;

  const featuredProduct = products[0];
  const otherProducts = products.slice(1);
  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
    showToast("Added to Cart", `${product.name} has been added.`);
  };
  return (
    <>
      <ToastComponent />
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        <h1 className="text-3xl font-bold text-center">Our Products</h1>
        <Link href={`/product/${featuredProduct.id}`}>
          <Card className="max-w-[800px] mx-auto overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 border border-primary/20 bg-gradient-to-br from-white to-primary/5">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="h-[250px] relative group">
                <div className="absolute inset-0 bg-primary/10 group-hover:opacity-0 transition-opacity duration-300"></div>
                <Image
                  src={featuredProduct.image_url || ""}
                  alt={featuredProduct.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  width={500} // Set a width (in px) or use the correct width
                  height={500} // Set a height (in px) or use the correct height
                />
                <div className="absolute top-3 left-3 bg-primary text-white px-2 py-0.5 rounded-full text-xs font-medium">
                  Featured
                </div>
              </div>
              <CardContent className="p-4 flex flex-col justify-center">
                <h2 className="text-xl font-bold mb-2 text-primary">
                  {featuredProduct.name}
                </h2>
                <p className="text-lg font-bold text-gray-900 mb-2">
                  {featuredProduct.price.toLocaleString()}₮
                </p>
                <p className="text-gray-600 mb-4 text-sm">
                  {featuredProduct.description}
                </p>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddToCart(featuredProduct);
                  }}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </CardContent>
            </div>
          </Card>
        </Link>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {otherProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
