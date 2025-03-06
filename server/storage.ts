import { products, type Product, type InsertProduct } from "@/shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product>;
  deleteProduct(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }

  async updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product> {
    const [updated] = await db
      .update(products)
      .set(product)
      .where(eq(products.id, id))
      .returning();

    if (!updated) {
      throw new Error("Product not found");
    }

    return updated;
  }

  async deleteProduct(id: number): Promise<void> {
    await db.delete(products).where(eq(products.id, id));
  }
}

// Initialize with sample products
async function initializeProducts() {
  const existingProducts = await db.select().from(products);

  if (existingProducts.length === 0) {
    const sampleProducts: InsertProduct[] = [
      {
        name: "Premium Watch",
        description: "Elegant timepiece for any occasion",
        price: 199.99,
        image_url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      },
      {
        name: "Wireless Headphones",
        description: "Premium sound quality with noise cancellation",
        price: 159.99,
        image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      },
      {
        name: "Smart Watch",
        description: "Track your fitness and stay connected",
        price: 299.99,
        image_url: "https://images.unsplash.com/photo-1596460107916-430662021049",
      }
    ];
    for (const product of sampleProducts) {
      await db.insert(products).values(product);
    }
  }
}

export const storage = new DatabaseStorage();
// Initialize sample products
initializeProducts().catch(console.error);