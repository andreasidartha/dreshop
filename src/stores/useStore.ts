import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number | null;
  rating: number;
  reviews: number;
  image: string;
  badge: string | null;
  isNew: boolean;
  category?: string;
  brand?: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  currency: 'USD' | 'EUR' | 'GBP';
  language: 'en' | 'es' | 'fr';
  notifications: boolean;
}

interface SearchHistory {
  query: string;
  timestamp: number;
}

interface Store {
  // Cart State
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;

  // Wishlist State
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;

  // User Preferences
  preferences: UserPreferences;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;

  // Search State
  searchHistory: SearchHistory[];
  addSearchHistory: (query: string) => void;
  clearSearchHistory: () => void;

  // Recently Viewed
  recentlyViewed: Product[];
  addRecentlyViewed: (product: Product) => void;
  clearRecentlyViewed: () => void;

  // UI State
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  
  // Product Comparison
  comparisonList: Product[];
  addToComparison: (product: Product) => void;
  removeFromComparison: (productId: number) => void;
  clearComparison: () => void;
  isInComparison: (productId: number) => boolean;
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      // Cart State
      cart: [],
      addToCart: (product) => {
        const { cart } = get();
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
          set({
            cart: cart.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          });
        } else {
          set({
            cart: [...cart, { ...product, quantity: 1 }]
          });
        }
      },
      removeFromCart: (productId) => {
        const { cart } = get();
        set({
          cart: cart.filter(item => item.id !== productId)
        });
      },
      updateQuantity: (productId, quantity) => {
        const { cart } = get();
        if (quantity <= 0) {
          get().removeFromCart(productId);
        } else {
          set({
            cart: cart.map(item =>
              item.id === productId
                ? { ...item, quantity }
                : item
            )
          });
        }
      },
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      getCartItemCount: () => {
        const { cart } = get();
        return cart.reduce((count, item) => count + item.quantity, 0);
      },

      // Wishlist State
      wishlist: [],
      addToWishlist: (product) => {
        const { wishlist } = get();
        if (!wishlist.find(item => item.id === product.id)) {
          set({ wishlist: [...wishlist, product] });
        }
      },
      removeFromWishlist: (productId) => {
        const { wishlist } = get();
        set({
          wishlist: wishlist.filter(item => item.id !== productId)
        });
      },
      isInWishlist: (productId) => {
        const { wishlist } = get();
        return wishlist.some(item => item.id === productId);
      },

      // User Preferences
      preferences: {
        theme: 'system',
        currency: 'USD',
        language: 'en',
        notifications: true
      },
      updatePreferences: (newPreferences) => {
        const { preferences } = get();
        set({
          preferences: { ...preferences, ...newPreferences }
        });
      },

      // Search History
      searchHistory: [],
      addSearchHistory: (query) => {
        const { searchHistory } = get();
        const newHistory = [
          { query, timestamp: Date.now() },
          ...searchHistory.filter(item => item.query !== query)
        ].slice(0, 10); // Keep only last 10 searches
        set({ searchHistory: newHistory });
      },
      clearSearchHistory: () => set({ searchHistory: [] }),

      // Recently Viewed
      recentlyViewed: [],
      addRecentlyViewed: (product) => {
        const { recentlyViewed } = get();
        const newRecentlyViewed = [
          product,
          ...recentlyViewed.filter(item => item.id !== product.id)
        ].slice(0, 8); // Keep only last 8 products
        set({ recentlyViewed: newRecentlyViewed });
      },
      clearRecentlyViewed: () => set({ recentlyViewed: [] }),

      // UI State
      sidebarOpen: false,
      toggleSidebar: () => {
        const { sidebarOpen } = get();
        set({ sidebarOpen: !sidebarOpen });
      },

      // Product Comparison
      comparisonList: [],
      addToComparison: (product) => {
        const { comparisonList } = get();
        if (comparisonList.length < 4 && !comparisonList.find(item => item.id === product.id)) {
          set({ comparisonList: [...comparisonList, product] });
        }
      },
      removeFromComparison: (productId) => {
        const { comparisonList } = get();
        set({
          comparisonList: comparisonList.filter(item => item.id !== productId)
        });
      },
      clearComparison: () => set({ comparisonList: [] }),
      isInComparison: (productId) => {
        const { comparisonList } = get();
        return comparisonList.some(item => item.id === productId);
      }
    }),
    {
      name: 'dreshop-store',
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
        preferences: state.preferences,
        searchHistory: state.searchHistory,
        recentlyViewed: state.recentlyViewed,
        comparisonList: state.comparisonList
      })
    }
  )
); 