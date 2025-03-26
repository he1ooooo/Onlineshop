"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { useAuthStore } from "@/app/lib/auth-store";
import { Lock } from "lucide-react";
import Link from "next/link";
import ToastComponent, { showToast } from "@/app/components/toast";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(password);
      if (success) {
        <Link href="/admin/products" />;
        showToast("Login", "Welcome to admin dashboard");
        router.push('/products');
      } else {
        showToast("Acces Denied", "Invalid admin password");
        console.log(password)
      }
    } catch {
      showToast("Error", "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
    console.log(isLoading);
  };

  return (
    <>
      <ToastComponent />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              <CardTitle>Admin Access</CardTitle>
            </div>
            <CardDescription>
              Enter your admin password to manage products
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Login to Admin Panel"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
