import { pgTable, text, serial, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: real("price").notNull(),
  image_url: text("image_url").notNull(),
});
// export default async (req, res) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   // Handle your request here
//   res.status(200).json({ message: 'Success' });
// };
 
export const insertProductSchema = createInsertSchema(products).pick({
  name: true,  
  description: true,
  price: true,
  image_url: true,
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

export const cartItemSchema = z.object({
  productId: z.number(),
  quantity: z.number().min(1),
});

export type CartItem = z.infer<typeof cartItemSchema>;