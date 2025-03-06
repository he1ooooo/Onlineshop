import { useQuery } from "@tanstack/react-query";
import { Product } from "@/shared/schema";
import { useCartStore } from "@/app/lib/cart-store";
import { Card, CardContent } from "../../../test-app/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { useLocation } from "wouter";
import { CheckCircle2 } from "lucide-react";

export default function OrderSummary() {
  const [, navigate] = useLocation();
  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const { data: products } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  if (!products) return null;

  const cartProducts = cartItems.map((item) => ({
    product: products.find((p) => p.id === item.productId)!,
    quantity: item.quantity,
  }));

  const subtotal = cartProducts.reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0
  );

  const handleFinish = () => {
    clearCart();
    navigate("/products");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardContent className="p-6">
          <div className="text-center mb-8">
            <CheckCircle2 className="mx-auto h-12 w-12 text-primary mb-4" />
            <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground">
              Thank you for your purchase
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-semibold text-lg">Order Details</h2>
            {cartProducts.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Quantity: {quantity}
                  </p>
                </div>
                <p>{(product.price * quantity).toLocaleString()}₮</p>
              </div>
            ))}

            <div className="border-t pt-4">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{subtotal.toLocaleString()}₮</span>
              </div>
            </div>

            <Button className="w-full mt-8" onClick={handleFinish}>
              Continue Shopping
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
