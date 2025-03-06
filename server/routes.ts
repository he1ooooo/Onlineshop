import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProductSchema } from "@/shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("https://kqqkcergzwlfbfmyrijr.supabase.co/rest/v1/products", async (_req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  app.get("https://kqqkcergzwlfbfmyrijr.supabase.co/rest/v1/products/:id", async (req, res) => {
    const product = await storage.getProduct(Number(req.params.id));
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json(product);
  });

  app.post("https://kqqkcergzwlfbfmyrijr.supabase.co/rest/v1/products", async (req, res) => {
    const result = insertProductSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ message: "Invalid product data" });
      return;
    }
    const product = await storage.createProduct(result.data);
    res.status(201).json(product);
  });

  app.patch("https://kqqkcergzwlfbfmyrijr.supabase.co/rest/v1/products/:id", async (req, res) => {
    const result = insertProductSchema.partial().safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ message: "Invalid product data" });
      return;
    }
    try {
      const product = await storage.updateProduct(Number(req.params.id), result.data);
      res.json(product);
    } catch (error) {
      res.status(404).json({ message: "Product not found" });
    }
  });

  app.delete("https://kqqkcergzwlfbfmyrijr.supabase.co/rest/v1/products/:id", async (req, res) => {
    await storage.deleteProduct(Number(req.params.id));
    res.status(204).end();
  });

  const httpServer = createServer(app);
  return httpServer;
}
