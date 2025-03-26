import { Product } from "@/shared/schema";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Trash2 } from "lucide-react";
import { useCartStore } from "@/app/lib/cart-store";
import Image from "next/image";

interface CartItemProps {
  product: Product;
  quantity: number;
}

export function CartItem({ product, quantity }: CartItemProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const num = product.price * quantity;
  return (
    <div className="flex gap-4 py-4 border-b">
      <Image
        src={product.image_url}
        alt={product.name}
        className="h-24 w-24 object-cover rounded"
        width={96} // Equivalent to 24rem (h-24), which is 96px
        height={96} // Equivalent to 24rem (w-24), which is 96px
      />
      <div className="flex-1">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-muted-foreground">
          {product.price.toLocaleString()} * {quantity.toLocaleString()} ={" "}
          {num.toLocaleString()}₮
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => updateQuantity(product.id, parseInt(e.target.value))}
          className="w-20"
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeItem(product.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
