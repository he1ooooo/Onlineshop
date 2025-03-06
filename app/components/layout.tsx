import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { ShoppingCart, LogOut } from "lucide-react";
import { useCartStore } from "@/app/lib/cart-store";
import { useAuthStore } from "@/app/lib/auth-store";
export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const cartItems = useCartStore((state) => state.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const isAdminPage = location.pathname.startsWith('/admin');
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-gray-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              {/* {isAdminPage ? (
              //   <Link href="/admin/products">
              //     <a className="text-2xl font-bold text-primary">Admin Dashboard</a>
              //   </Link>
              // ) : (
              //   <>
              //     <Link href="/">
              //       <a className="text-xl md:text-2xl font-bold text-primary">ShopEase</a>
              //     </Link>
              //     <Link href="/products">
              //       <a className="text-muted-foreground hover:text-foreground py-2">Products</a>
              //     </Link>
                // </>
              )} */}
            </div>
            {isAuthenticated && (
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            )}
            {!isAdminPage&& (
              <Link to={{pathname:"/cart"}} >
                <Button variant="outline" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
