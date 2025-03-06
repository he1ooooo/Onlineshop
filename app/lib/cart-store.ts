// import { create } from 'zustand';
// import { CartItem, Product } from '../../shared/schema';

// interface CartStore {
//   items: CartItem[];
//   addItem: (product: Product, quantity: number) => void;
//   removeItem: (productId: number) => void;
//   updateQuantity: (productId: number, quantity: number) => void;
//   clearCart: () => void;
// }

// export const useCartStore = create<CartStore>((set) => ({
//   items: loadCartFromLocalStorage(),
//   addItem: (product, quantity) => 
//     set((state) => {
//       const existingItem = state.items.find(item => item.productId === product.id);
//       if (existingItem) {
//         return {
//           items: state.items.map(item =>
//             item.productId === product.id
//               ? { ...item, quantity: item.quantity + quantity }
//               : item
//           ),
//         };
//       }
//       return {
//         items: [...state.items, { ...product, productId: product.id, quantity }], // Ensure product properties are included
//       };
//     }),
//   removeItem: (productId) =>
//     set((state) => ({
//       items: state.items.filter(item => item.productId !== productId),
//     })),
//   updateQuantity: (productId, quantity) =>
//     set((state) => ({
//       items: state.items.map(item =>
//         item.productId === productId ? { ...item, quantity } : item
//       ),
//     })),
//   clearCart: () => set({ items: [] }),
// }));
// function loadCartFromLocalStorage(): { productId: number; quantity: number; }[] {
//   if (typeof window === 'undefined') return [];
//   const cart = localStorage.getItem('cart');
//   return cart ? JSON.parse(cart) : [];
// }











import { create } from 'zustand';
import { CartItem, Product } from '../../shared/schema';

// Define the Zustand store interface
interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  setCart: (items: CartItem[]) => void; // Action to update cart state
}

// Create the Zustand store
export const useCartStore = create<CartStore>((set) => {
  let initialCart: CartItem[] = [];

  // Only run this logic on the client-side
  if (typeof window !== 'undefined') {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      initialCart = JSON.parse(storedCart);
    }
  }

  return {
    items: initialCart, // Set initial items from localStorage (or default to empty array)
    setCart: (items) => {
      // Update cart state and save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(items));
      }
      set({ items });
    },

    addItem: (product, quantity) =>
      set((state) => {
        const existingItem = state.items.find(item => item.productId === product.id);
        if (existingItem) {
          const updatedItems = state.items.map(item =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
          if (typeof window !== 'undefined') {
            localStorage.setItem('cart', JSON.stringify(updatedItems));
          }
          return { items: updatedItems };
        }

        const updatedItems = [...state.items, { ...product, productId: product.id, quantity }];
        if (typeof window !== 'undefined') {
          localStorage.setItem('cart', JSON.stringify(updatedItems));
        }
        return { items: updatedItems };
      }),

    removeItem: (productId) =>
      set((state) => {
        const updatedItems = state.items.filter(item => item.productId !== productId);
        if (typeof window !== 'undefined') {
          localStorage.setItem('cart', JSON.stringify(updatedItems));
        }
        return { items: updatedItems };
      }),

    updateQuantity: (productId, quantity) =>
      set((state) => {
        const updatedItems = state.items.map(item =>
          item.productId === productId ? { ...item, quantity } : item
        );
        if (typeof window !== 'undefined') {
          localStorage.setItem('cart', JSON.stringify(updatedItems));
        }
        return { items: updatedItems };
      }),

    clearCart: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('cart');
      }
      return { items: [] };
    },
  };
});
