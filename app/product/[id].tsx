import { useQuery } from "@tanstack/react-query";
import { Product } from "@/shared/schema";
import { useParams } from "wouter";
import { Button } from "@/app/components/ui/button";
import { useCartStore } from "@/app/lib/cart-store";
import { useToast } from "@/app/hooks/use-toast";
import { Card, CardContent } from "@/app/components/ui/card";
import { ShoppingCart } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const addItem = useCartStore((state) => state.addItem);

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: [`/api/products/${id}`],
  });

  if (isLoading || !product) {
    return <div className="flex justify-center items-center min-h-[60vh]">Loading...</div>;
  }

  const handleAddToCart = () => {
    addItem(product, 1);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
     
      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="aspect-square">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <CardContent className="p-6 flex flex-col">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-xl font-bold text-primary mb-4">
              ₮{product.price.toLocaleString()}
            </p>
            <p className="text-muted-foreground flex-grow">
              {product.description}
            </p>
            <Button 
              size="lg" 
              className="w-full mt-6"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
