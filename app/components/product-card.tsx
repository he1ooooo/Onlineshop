import { Product } from "@/shared/schema";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { useCartStore } from "@/app/lib/cart-store";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Edit, Trash2 } from "lucide-react";
import { showToast } from "@/app/components/toast";
interface ProductCardProps {
  product: Product;
  isAdmin?: boolean;
  onEdit?: (product: Product) => void;
  onDelete?: (id: number) => void;
}

export function ProductCard({
  product,
  isAdmin,
  onEdit,
  onDelete,
}: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1);
    showToast("Added to Cart", `${product.name} has been added.`);
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
    <Link href={`/product/${product.id}`} passHref>
      <Card className="max-w-[280px] mx-auto overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer bg-white/50 backdrop-blur-sm">
        <div className="aspect-square overflow-hidden">
          <Image
            src={product.image_url || ""}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            width={500} // Set a width (in px) or use the correct width
            height={500} // Set a height (in px) or use the correct height
          />
        </div>
        <CardContent className="p-3">
          <h3 className="font-medium text-base text-gray-800">
            {product.name}
          </h3>
          <p className="text-gray-500 text-sm mt-1 line-clamp-2">
            {product.description}
          </p>
          <p className="text-base font-semibold mt-2 text-gray-900">
            {product.price.toLocaleString()}₮
          </p>
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
