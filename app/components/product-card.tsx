import { Product } from "@/shared/schema";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { useCartStore } from "@/app/lib/cart-store";
import { useToast } from "@/app/hooks/use-toast";
import { Link, useLocation } from "wouter";
import { ShoppingCart, Edit, Trash2 } from "lucide-react";

interface ProductCardProps {
  product: Product;
  isAdmin?: boolean;
  onEdit?: (product: Product) => void;
  onDelete?: (id: number) => void;
}

export function ProductCard({ product, isAdmin, onEdit, onDelete }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the add to cart button
    addItem(product, 1);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cartaa.`,
    });
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onEdit) {
      onEdit(product);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onDelete) {
      onDelete(product.id);
    }
  };

  return (
    <Link href={`/product/${product.id}`}>
      <Card className="max-w-[280px] mx-auto overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer bg-white/50 backdrop-blur-sm">
        <div className="aspect-square overflow-hidden">
          <img
            src={product.image_url}
            alt={product.name}
            className="h-full w-full object-cover transition-transform hover:scale-102"
          />
        </div>
        <CardContent className="p-3">
          <h3 className="font-medium text-base text-gray-800">{product.name}</h3>
          <p className="text-gray-500 text-sm mt-1 line-clamp-2">{product.description}</p>
          <p className="text-base font-semibold mt-2 text-gray-900">{product.price.toLocaleString()}₮</p>
        </CardContent>
        <CardFooter className="p-3 pt-0">
          {isAdmin ? (
            <div className="flex gap-2 w-full">
              <Button
                variant="outline"
                className="flex-1 bg-gray-50 hover:bg-gray-100 border-gray-200"
                onClick={handleEdit}
              >
                <Edit className="h-3.5 w-3.5 mr-1.5" />
                Edit
              </Button>
              <Button
                variant="destructive"
                className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 border-red-200"
                onClick={handleDelete}
              >
                <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                Delete
              </Button>
            </div>
          ) : (
            <Button 
              className="w-full bg-gray-900 hover:bg-gray-800 text-sm"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
              Add to Cart
            </Button>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}