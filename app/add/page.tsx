'use client';
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/shared/schema";
import { CartItem } from "@/app/components/cart-item";
import { useCartStore } from "@/app/lib/cart-store";
import { Card } from "@/app/components/ui/card";
import Link from 'next/link'
export default function Cart() {
    const cartItems = useCartStore((state) => state.items);
    
    const { data: products, isLoading, isError } = useQuery<Product[]>({
      queryKey: ['products'],
      queryFn: async () => {
        const response = await fetch('https://kqqkcergzwlfbfmyrijr.supabase.co/rest/v1/products', {
          headers: {
            'apikey' : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxcWtjZXJnendsZmJmbXlyaWpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1MzQ3MzYsImV4cCI6MjA1NTExMDczNn0.4yEJaQJlmA5mNfuId6jVRjlCI8bhyrdTJLo4vd0Fpfo`,
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxcWtjZXJnendsZmJmbXlyaWpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1MzQ3MzYsImV4cCI6MjA1NTExMDczNn0.4yEJaQJlmA5mNfuId6jVRjlCI8bhyrdTJLo4vd0Fpfo`, // Include your access token if needed
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      },
    });
  
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading products.</div>;
    if (!products) return <div>No products found.</div>;
  
    const cartProducts = cartItems.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return null; // or handle the case appropriately
      return {
        product,
        quantity: item.quantity,
      };
    }).filter(Boolean); // Filter out null values
  
    const subtotal = cartProducts.reduce(
      (sum, item) => item ? sum + item.product.price * item.quantity : sum,
      0
    );
  
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Your cart is empty</p>
            <Link href="/products">Continue Shopping</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {cartProducts.map((item) => (
                item && (
                  <CartItem
                    key={item.product.id}
                    product={item.product}
                    quantity={item.quantity}
                  />
                )
              ))}
            </div>
            <div>
              <Card className="p-6">
                <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
                <div className="flex justify-between mb-4">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <Link href="/order-summary">Proceed to Checkout</Link>
              </Card>
            </div>
          </div>
        )}
      </div>
    );
  }
  